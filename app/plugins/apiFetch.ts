export default defineNuxtPlugin(() => {
	const {
		public: { baseApiURL, nginx, docker },
	} = useRuntimeConfig();

	// Determine the base URL for API requests (check if running on server or client + if there is nginx proxy)
	const baseUrl: string = docker
		? "http://api:8000/api/"
		: nginx
			? "/api/"
			: baseApiURL;

	const apiFetch = $fetch.create({
		baseURL: baseUrl,
		onRequest({ options }) {
			if (!options) return;
			if (!options.headers) options.headers = new Headers();

			// Determine whether current interface is admin or front user
			const route = useRoute();
			const isAdmin =
				typeof route.path === "string" && route.path.startsWith("/admin");

			const preferredCookieName = isAdmin
				? "adminTokenCookie"
				: "userTokenCookie";

			const preferredCookie = useCookie(preferredCookieName);
			const token = preferredCookie.value;

			if (token) options.headers.set("Authorization", `Bearer ${token}`);
		},
	});

	// Expose to useNuxtApp().$apiFetch
	return {
		provide: {
			apiFetch,
		},
	};
});
