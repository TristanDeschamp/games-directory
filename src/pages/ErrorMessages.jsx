import { Link } from "react-router-dom";

const ErrorMessages = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
			{/* Animation 404 */}
			<h1 className="text-9xl font-extrabold tracking-widest text-red-600 animate-pulse shadow-red-500">
				404
			</h1>
			<p className="text-2xl mt-4">Oups, vous vous êtes égaré !</p>
			<p className="text-gray-400 text-lg mt-2">
				Cette page n'existe pas... Peut-être avez-vous pris le mauvais chemin ? 🧭
			</p>

			{/* Bouton Retour */}
			<Link
				to="/"
				className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transition transform duration-300"
			>
				⬅ Retour à l'accueil
			</Link>

			{/* Effet de secousse */}
			<style>
				{`
					@keyframes shake {
						0% { transform: translateX(0); }
						25% { transform: translateX(-5px); }
						50% { transform: translateX(5px); }
						75% { transform: translateX(-5px); }
						100% { transform: translateX(0); }
					}
					h1 {
						animation: shake 1s infinite;
						text-shadow: 0px 0px 10px rgba(255, 0, 0, 0.8);
					}
				`}
			</style>
		</div>
	);
};

export default ErrorMessages;