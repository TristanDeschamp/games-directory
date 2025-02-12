import { useEffect, useState } from "react";
import haversine from '../utils/haversine.js';
import { Link } from "react-router-dom";

const MyShop = () => {
	const [shops, setShops] = useState([]);
	const [userLocation, setUserLocation] = useState(null);
	const [nearestShop, setNearestShop] = useState(null);

	useEffect(() => {
		fetch("https://formacitron.github.io/shopslist/shops.json")
			.then(response => response.json())
			.then(data => setShops(data))
			.catch(error => console.error("Erreur lors des chargements des magasins :", error));
	}, []);

	useEffect(() => {
		if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						setUserLocation({
							lat: position.coords.latitude,
							lon: position.coords.longitude
						});
					},
					(error) => console.error("Erreur de géolocalisation :", error)
				);
		} else {
			console.error("La géolocalisation n'est pas supportée par ce navigateur.");
		}
	}, []);

	useEffect(() => {
		if (!userLocation || shops.length === 0) return;

		let minDistance = Infinity;
		let closestShop = null;

		shops.forEach(shop => {
				const shopCoords = { lat: shop.gps_lat, lon: shop.gps_lng };
				const distance = haversine(userLocation, shopCoords);

				if (distance < minDistance) {
					minDistance = distance;
					closestShop = { ...shop, distance };
				}
		});

		setNearestShop(closestShop);
	}, [userLocation, shops]);

	return (
		<div className="min-h-screen bg-gray-900 text-white">
				{/* Bannière */}
				<div 
					className="relative h-64 bg-cover bg-center flex items-center justify-center"
					style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?store,shop')" }}
				>
					<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<h1 className="text-4xl font-bold">🏪 Trouver un Magasin</h1>
					</div>
				</div>

				<div className="p-6 max-w-4xl mx-auto">
					{/* Bouton retour */}
					<div className="mb-6 text-center">
						<Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 transition">
								⬅ Retour à l'accueil
						</Link>
					</div>

					{/* Position utilisateur */}
					{userLocation ? (
						<p className="text-center text-green-400">
								📍 Votre position : {userLocation.lat.toFixed(2)}, {userLocation.lon.toFixed(2)}
						</p>
					) : (
						<p className="text-center text-red-400">🔴 Géolocalisation en attente...</p>
					)}

					{/* Magasin le plus proche */}
					{nearestShop ? (
						<div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mt-6">
								<h2 className="text-2xl font-semibold text-yellow-400">🏪 Magasin le plus proche</h2>
								<p className="text-lg font-bold mt-2">{nearestShop.name}</p>
								<p className="text-gray-300">📍 {nearestShop.city}</p>
								<p className="text-gray-300">📏 {nearestShop.distance.toFixed(2)} km</p>
						</div>
					) : (
						<p className="text-center text-gray-500 mt-4">⏳ Calcul du magasin le plus proche...</p>
					)}

					{/* Liste des magasins */}
					<h2 className="text-2xl font-semibold mt-8 text-center">📍 Liste des magasins</h2>
					{shops.length === 0 ? (
						<p className="text-center text-gray-400">Chargement des magasins...</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
								{shops.slice(0, 10).map((shop, index) => (
									<div 
										key={index} 
										className="bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition transform"
									>
										<h3 className="text-xl font-bold">{shop.name}</h3>
										<p className="text-gray-300">📍 {shop.city}</p>
									</div>
								))}
						</div>
					)}
				</div>
		</div>
	);
};

export default MyShop;