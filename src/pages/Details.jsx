import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
	const {slug} = useParams();
	const navigate = useNavigate();
	const [game, setGame] = useState(null);
	const apiKey = "964e5d6eba7e42b1a810f27c99450b38";

	useEffect(() => {
		const fetchGameDetails = async () => {
			try {
				const response = await fetch (`https://api.rawg.io/api/games/${slug}?key=${apiKey}`);
				const data = await response.json();
				setGame(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des détails du jeu :", error);
			}
		};

		fetchGameDetails();
	}, [slug]);

	if (!game) return <p className="text-center text-lg mt-10">Chargement...</p>

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			{/* Image de couverture */}
			<div 
				className="relative h-80 bg-cover bg-center"
				style={{ backgroundImage: `url(${game.background_image})` }}
			>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<h1 className="text-4xl font-bold">{game.name}</h1>
				</div>
			</div>

			<div className="p-6 max-w-4xl mx-auto">
				{/* Bouton Retour */}
				<button
					onClick={() => navigate(-1)}
					className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
				>
					⬅ Retour
				</button>

				{/* Contenu du jeu */}
				<div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
					<div className="p-6">
						<h1 className="text-3xl font-bold">{game.name}</h1>
						<p className="text-gray-400 text-sm mt-2">📅 Date de sortie : {game.released}</p>

						{/* Genres & Plateformes */}
						<div className="flex flex-wrap gap-3 mt-4">
							<p className="bg-green-600 px-3 py-1 rounded-lg text-sm">
								🎮 Genres : {game.genres.map(g => g.name).join(", ")}
							</p>
							<p className="bg-purple-600 px-3 py-1 rounded-lg text-sm">
								🖥️ Plateformes : {game.platforms.map(p => p.platform.name).join(", ")}
							</p>
						</div>

						{/* Score et Metacritic */}
						<div className="flex justify-between items-center mt-4">
							<p className="text-lg font-semibold text-yellow-400">⭐ {game.rating} / 5</p>
							{game.metacritic && (
								<span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
									Metacritic : {game.metacritic}
								</span>
							)}
						</div>

						{/* Description du jeu */}
						<div className="mt-4 text-gray-300 leading-relaxed">
							<h3 className="text-lg font-semibold mb-2">📝 Description :</h3>
							<p dangerouslySetInnerHTML={{ __html: game.description }}></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;