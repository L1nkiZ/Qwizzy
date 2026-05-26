type Quiz = {
	numberOfQuestions: number;
	categoryId?: number;
};

/**
 * Récupère les questions pour un quiz
 * @param payload Données du quiz pour lesquelles récupérer les questions
 * @returns Promise contenant les données des questions et une éventuelle erreur
 */
export function getQuestions(payload: Partial<Quiz>) {
	return useNuxtApp().$apiFetch<{
		questions: { id: number; subject: string; title: string }[];
	}>("/game/getQuestions", {
		method: "POST",
		body: {
			numberOfQuestions: payload.numberOfQuestions,
			subjectId: payload.categoryId,
		},
	});
}

/**
 * Récupère les possibilités de réponse pour une question
 * @param payload Données de la question pour lesquelles récupérer les réponses
 * @returns Promise contenant les données des réponses et une éventuelle erreur
 */
export function getPossibleAnswers(payload: {
	question_id: number;
	mode: 1 | 2 | 3;
}) {
	return useNuxtApp().$apiFetch<{
		proposals: { position: number; label: string }[];
	}>("/game/questions/options", {
		method: "POST",
		body: payload,
	});
}

/**
 * Récupère la bonne réponse pour une question
 * @param payload Id de la question pour laquelle récupérer la réponse
 * @returns Promise contenant la réponses et une éventuelle erreur
 */
export function getCorrectAnswer(payload: { question_id: number }) {
	return useNuxtApp().$apiFetch<{
		correct_answer_position: number;
		correct_answer_label: string;
	}>("/game/answers/check", {
		method: "POST",
		body: payload,
	});
}
