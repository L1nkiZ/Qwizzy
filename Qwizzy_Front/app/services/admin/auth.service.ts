import type { User } from "~/types/user.type";

type UserLoginResponse = {
	error: boolean;
	message: string;
	user: {
		id: number;
		name: string;
		email: string;
		role_id: number;
		email_verified_at: string;
		created_at: string;
		updated_at: string;
	};
	token: string;
	token_type: "Bearer";
	expires_at: string;
};

/**
 * Connexion d'un user
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Promise contenant les données de l'utilisateur connecté et une éventuelle erreur
 */
export function login(email: string, password: string) {
	return useNuxtApp().$apiFetch<UserLoginResponse>("/auth/login", {
		method: "POST",
		body: { email, password },
	});
}

/**
 * Création d'un compte user
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Promise contenant les données de l'utilisateur connecté et une éventuelle erreur
 */
export function register(username: string, email: string, password: string) {
	return useNuxtApp().$apiFetch<UserLoginResponse>("/auth/register", {
		method: "POST",
		body: { username, email, password },
	});
}

/**
 * Affiche les informations du user connecté
 * @returns Promise contenant les données de l'utilisateur et une éventuelle erreur
 */
export function fetchCurrentUser() {
	return useApiFetch<{ user: User }>("/auth/me");
}
