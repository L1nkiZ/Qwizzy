// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: [
		"@nuxt/eslint",
		"@nuxt/test-utils/module",
		"@nuxt/ui",
		"@pinia/nuxt",
		"@compodium/nuxt",
	],
	icon: { localApiEndpoint: "/nuxt/api" },
	runtimeConfig: {
		public: {
			baseApiURL: process.env.BASE_API_URL ?? "http://localhost:8000/api/",
		},
	},
	css: ["~/assets/css/main.css"],
});
