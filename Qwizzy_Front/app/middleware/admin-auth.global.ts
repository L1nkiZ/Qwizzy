export default defineNuxtRouteMiddleware((to) => {
	if (to.path.startsWith("/admin") && to.path !== "/admin/connexion") {
		const adminTokenCookie = useCookie("adminTokenCookie");
		// Si le cookie n'existe pas ou n'a pas de valeur, rediriger vers /connexion
		if (!adminTokenCookie.value) {
			return navigateTo("/admin/connexion");
		}
	}
});
