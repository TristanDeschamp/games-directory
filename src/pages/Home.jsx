import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import BookmarksContext from '../BookmarksContext';

const Home = () => {
	const { bookmarks, setBookmarks } = useContext(BookmarksContext);
	const [searchText, setSearchText] = useState("");
	const [games, setGames] = useState([]);

	const isBookmarked = (slug) => bookmarks.some(game => game.slug === slug);

	const toggleBookmark = (game) => {
		setBookmarks(prevBookmarks => {
			if (isBookmarked(game.slug))
			{
				return prevBookmarks.filter(b => b.slug !== game.slug);
			} else {
				return [...prevBookmarks, game];
			}
		});
	}
	
	const handleSearch = async (e) => {
		e.preventDefault();
		const apiKey = "964e5d6eba7e42b1a810f27c99450b38";
	
		try {
			const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`);
			const data = await response.json();
			setGames(data.results || []); // Si pas de résultat, évite un crash
		} catch (error) {
			alert("Une erreur est survenue...");
			console.error("Erreur lors de la récupération des jeux :", error);
		}
	};

	return (
		<>		
			<div className="p-6 bg-gray-900 min-h-screen text-white">
				{/* Bannière avec titre */}
				<div className="text-center mb-6">
					<h1 className="text-4xl font-bold mb-2">🎮 Moteur de Recherche de Jeux</h1>
					<p className="text-gray-400">Recherchez vos jeux préférés et ajoutez-les en favoris !</p>
				</div>

				{/* Barre de recherche */}
				<form onSubmit={handleSearch} className="flex justify-center mb-6">
					<input
						type="text"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						className="border border-gray-600 rounded-l px-4 py-2 w-1/3 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Rechercher un jeu..."
						autoFocus
					/>
					<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-500 transition">
						🔍
					</button>
				</form>

				{/* Boutons de navigation */}
				<div className="flex justify-center space-x-4 mb-6">
					<Link to="/bookmarks" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-400 transition">
						★ Voir mes Favoris
					</Link>
					<Link to="/myshop" className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-500 transition">
						🏪 Trouver un Magasin
					</Link>
				</div>

				{/* Liste des jeux affichés */}
				<div className="sm:w-full md:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{games.map(game => (
						<div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition">
							<Link to={`/details/${game.slug}`} className="block">
								<img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
								<div className="p-4">
									<h2 className="text-xl font-bold">{game.name}</h2>
									<p className="text-gray-400">⭐ {game.rating} / 5</p>
								</div>
							</Link>

							{/* Bouton Favori */}
							<button
								onClick={() => toggleBookmark(game)}
								className={`w-full py-2 text-xl ${isBookmarked(game.slug) ? "bg-yellow-500" : "bg-gray-700"} hover:opacity-80 transition`}
							>
								{isBookmarked(game.slug) ? "★ En Favoris" : "☆ Ajouter aux Favoris"}
							</button>
						</div>
					))}
				</div>

				{/* Message si aucun jeu trouvé */}
				{games.length === 0 && (
					<p className="text-center text-gray-400 mt-6">Aucun jeu trouvé. Essayez une autre recherche.</p>
				)}
			</div>
		</>
	);
}

export default Home;