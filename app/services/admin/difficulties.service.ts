import type { Difficulty } from "~/types/difficulty.type";

/**
 * Récupère la liste de toutes les difficultés
 * @returns Promise contenant les données des difficultés et une éventuelle erreur
 */
export function fetchDifficulties() {
	return useApiFetch<{ difficulty: { data: Difficulty[] } }>("/difficulties", {
		params: {
			current_sort: "id",
			current_sort_dir: "asc",
			per_page: 10000,
		},
	});
}

/**
 * Crée une nouvelle difficulté
 * @param payload Données de la difficulté à créer
 * @returns Promise contenant les données de la difficulté créée et une éventuelle erreur
 */
export function createDifficulty(payload: Partial<Difficulty>) {
	return useNuxtApp().$apiFetch("/difficulties", {
		method: "POST",
		body: payload,
	});
}

/**
 * Met à jour une difficulté existante
 * @param id ID de la difficulté à mettre à jour
 * @param payload Données de la difficulté à mettre à jour
 * @returns Promise contenant les données de la difficulté mise à jour et une éventuelle erreur
 */
export function updateDifficulty(id: number, payload: Partial<Difficulty>) {
	return useNuxtApp().$apiFetch(`/difficulties/${id}`, {
		method: "PUT",
		body: payload,
	});
}

/**
 * Supprime une difficulté existante
 * @param id ID de la difficulté à supprimer
 * @returns Promise contenant les données de la difficulté supprimée et une éventuelle erreur
 */
export function deleteDifficulty(id: number) {
	return useNuxtApp().$apiFetch(`/difficulties/${id}`, {
		method: "DELETE",
	});
}
