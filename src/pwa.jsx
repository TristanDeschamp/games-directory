import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
	onNeedRefresh() {
		if (confirm("Une nouvelle version est disponible. Voulez-vous mettre à jour ?"))
		{
			updateSW();
		}
	},

	onOfflineReady() {
		console.log("Application prête pour utilisation hors-ligne")
	},
})