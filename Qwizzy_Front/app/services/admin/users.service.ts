import type { User } from "~/types/user.type";

/**
 * Récupère la liste de tous les users
 * @returns Promise contenant les données des users et une éventuelle erreur
 */
export function fetchUsers() {
	return useApiFetch<User[]>("/admin/users");
}

/**
 * Met à jour le rôle d'un user
 * @param userId ID de l'utilisateur
 * @param role Nouveau rôle de l'utilisateur
 * @returns Promise contenant les données de l'utilisateur mis à jour et une éventuelle erreur
 */
export function updateUserRole(userId: number, role: string) {
	return useApiFetch<User>(`/admin/users/${userId}`, {
		method: "PUT",
		body: { role },
	});
}
