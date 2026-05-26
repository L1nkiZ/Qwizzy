/**
 * Récupère la réponse d'une question spécifique par son ID.
 * @returns Promise contenant les données des sujets et une éventuelle erreur
 */
export function fetchAnswer(id: number) {
	return useApiFetch(`/questions/show/${id}`);
}
