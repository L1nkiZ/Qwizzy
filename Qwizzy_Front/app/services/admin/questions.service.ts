import type { Question } from "~/types/question.type";

type UpdateQuestion = {
	question: string;
	proposal_1: string;
	proposal_2: string;
	proposal_3: string;
	proposal_4: string;
	correct_answer_number: number;
	subject_id: number;
	difficulty_id: number;
	question_type_id: number;
};

/**
 * Récupère la liste de toutes les questions
 * @returns Promise contenant les données des questions et une éventuelle erreur
 */
export function fetchQuestions() {
	return useApiFetch<{ questions: { data: Question[] } }>("/questions", {
		params: {
			current_sort: "id",
			current_sort_dir: "asc",
			per_page: 10000,
		},
	});
}

/**
 * Crée une nouvelle question
 * @param payload Données de la question à créer
 * @returns Promise contenant les données de la question créée et une éventuelle erreur
 */
export function createQuestion(payload: UpdateQuestion) {
	return useNuxtApp().$apiFetch("/questions", {
		method: "POST",
		body: payload,
	});
}

/**
 * Met à jour une question existante
 * @param id ID de la question à mettre à jour
 * @param payload Données de la question à mettre à jour
 * @returns Promise contenant les données de la question mise à jour et une éventuelle erreur
 */
export function updateQuestion(id: number, payload: UpdateQuestion) {
	return useNuxtApp().$apiFetch(`/questions/${id}`, {
		method: "PUT",
		body: payload,
	});
}

/**
 * Supprime une question existante
 * @param id ID de la question à supprimer
 * @returns Promise contenant un message et une éventuelle erreur
 */
export function deleteQuestion(id: number) {
	return useNuxtApp().$apiFetch(`/questions/${id}`, {
		method: "DELETE",
	});
}
