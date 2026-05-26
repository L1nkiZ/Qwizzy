export default defineNuxtRouteMiddleware(() => {
	const userTokenCookie = useCookie("userTokenCookie");

	// Si le cookie n'existe pas ou n'a pas de valeur, rediriger vers /connexion
	if (!userTokenCookie.value) {
		return navigateTo("/connexion");
	}
});
