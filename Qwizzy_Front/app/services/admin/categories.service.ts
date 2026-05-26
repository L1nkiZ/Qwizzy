import type { Category } from "~/types/category.type";

/**
 * Récupère la liste de toutes les catégories
 * @returns Promise contenant les données des catégories et une éventuelle erreur
 */
export function fetchCategories() {
	return useApiFetch<{ subject: { data: Category[] } }>("/subjects", {
		params: {
			current_sort: "id",
			current_sort_dir: "asc",
			per_page: 10000,
		},
	});
}

/**
 * Crée une nouvelle catégorie
 * @param payload Données de la catégorie à créer
 * @returns Promise contenant les données de la catégorie créée et une éventuelle erreur
 */
export function createCategory(payload: Partial<Category>) {
	return useNuxtApp().$apiFetch("/subjects", {
		method: "POST",
		body: payload,
	});
}

/**
 * Met à jour une catégorie existante
 * @param id ID de la catégorie à mettre à jour
 * @param payload Données de la catégorie à mettre à jour
 * @returns Promise contenant les données de la catégorie mise à jour et une éventuelle erreur
 */
export function updateCategory(id: number, payload: Partial<Category>) {
	return useNuxtApp().$apiFetch(`/subjects/${id}`, {
		method: "PUT",
		body: payload,
	});
}

/**
 * Supprime une catégorie existante
 * @param id ID de la catégorie à supprimer
 * @returns Promise contenant les données de la catégorie supprimée et une éventuelle erreur
 */
export function deleteCategory(id: number) {
	return useNuxtApp().$apiFetch(`/subjects/${id}`, {
		method: "DELETE",
	});
}
