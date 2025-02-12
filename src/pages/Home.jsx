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
		<div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
			{/* 🔥 Bannière avec effet néon */}
			<div className="text-center mb-10">
				<h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg animate-pulse">
					🎮 Game Finder
				</h1>
				<p className="text-gray-400 text-lg mt-2">
					Trouvez et ajoutez vos jeux favoris en un instant !
				</p>
			</div>

			{/* 🔍 Barre de recherche */}
			<form onSubmit={handleSearch} className="flex w-full max-w-lg bg-gray-800 rounded-lg overflow-hidden shadow-md">
				<input
					type="text"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					className="flex-grow px-4 py-3 bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					placeholder="Rechercher un jeu..."
					autoFocus
				/>
				<button type="submit" className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-500 transition">
					🔍
				</button>
			</form>

			{/* 🏆 Boutons de navigation */}
			<div className="flex flex-wrap justify-center space-x-4 mt-6">
				<Link to="/bookmarks" className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-400 transition">
					★ Mes Favoris
				</Link>
				<Link to="/myshop" className="px-6 py-2 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-500 transition">
					🏪 Trouver un Magasin
				</Link>
			</div>

			{/* 🎮 Liste des jeux affichés */}
			<div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
				{games.map(game => (
					<div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition">
						<Link to={`/details/${game.slug}`} className="block">
							<img src={game.background_image} alt={game.name} className="w-full h-48 object-cover rounded-t-lg" />
							<div className="p-4">
								<h2 className="text-xl font-bold">{game.name}</h2>
								<p className="text-gray-400">⭐ {game.rating} / 5</p>
							</div>
						</Link>

						{/* 🏅 Bouton Favori */}
						<button
							onClick={() => toggleBookmark(game)}
							className={`w-full py-3 text-xl font-semibold transition ${
								isBookmarked(game.slug) ? "bg-yellow-500 hover:bg-yellow-400" : "bg-gray-700 hover:bg-gray-600"
							}`}
						>
							{isBookmarked(game.slug) ? "★ En Favoris" : "☆ Ajouter aux Favoris"}
						</button>
					</div>
				))}
			</div>

			{/* ⏳ Message si aucun jeu trouvé */}
			{games.length === 0 && (
				<p className="text-center text-gray-400 mt-10 animate-pulse">
					Aucun jeu trouvé. Essayez une autre recherche.
				</p>
			)}
		</div>
		</>
	);
}

export default Home;