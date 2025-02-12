import React, { useContext } from "react";
import BookmarksContext from "../BookmarksContext";
import { Link } from "react-router-dom";

const Bookmarks = () => {
	const { bookmarks, setBookmarks } = useContext(BookmarksContext);

	const deleteBookmarks = (index) => {
		const tmpBookmarks = [...bookmarks];
		tmpBookmarks.splice(index, 1);
		setBookmarks(tmpBookmarks);
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-6">
			{/* Bannière */}
			<div className="text-center mb-6">
				<h1 className="text-4xl font-bold flex items-center justify-center">
					⭐ Mes Favoris
				</h1>
				<p className="text-gray-400">Retrouvez vos jeux préférés en un clic !</p>
			</div>

			{/* Bouton retour */}
			<div className="mb-6 text-center">
				<Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 transition">
					⬅ Retour à l'accueil
				</Link>
			</div>

			{/* Liste des favoris */}
			{bookmarks.length === 0 ? (
				<p className="text-center text-gray-500 text-lg">
					😢 Aucun favori ajouté. <br /> Trouvez des jeux et ajoutez-les à votre liste !
				</p>
			) : (
				<div className="sm:w-full md:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{bookmarks.map((bookmark, index) => (
						<div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
							{/* Image du jeu */}
							{bookmark.background_image && (
								<img src={bookmark.background_image} alt={bookmark.name} className="w-full h-48 object-cover" />
							)}

							{/* Détails du jeu */}
							<div className="p-4">
								<h2 className="text-xl font-bold">{bookmark.name}</h2>
								<p className="text-gray-400 text-sm">Ajouté à vos favoris</p>
							</div>

							{/* Bouton Supprimer */}
							<button
								onClick={() => deleteBookmarks(index)}
								className="w-full py-2 text-xl bg-red-600 hover:bg-red-500 transition"
							>
								🗑 Supprimer
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Bookmarks;