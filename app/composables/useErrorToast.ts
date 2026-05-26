import type { ToastProps } from "@nuxt/ui";
import type { FetchError } from "ofetch";

export interface UseErrorToastOptions {
	error?: Ref<FetchError | undefined>;
	title?: ToastProps["title"];
	description?: ToastProps["description"];
	icon?: ToastProps["icon"];
	actions?: ToastProps["actions"];
	retry?: () => Promise<void>;
}

/**
 * Affiche un toast d'erreur dont tous les params sont optionnels et utilise des valeurs par défaut en cas d'absence.
 *
 * @param options - Options du toast d'erreur
 * @param options.error - L'erreur du fetch
 * @param options.title - Titre
 * @param options.description - Description
 * @param options.icon - Icône
 * @param options.actions - Boutons actions
 * @param options.retry - Callback à exécuter lors du clic sur retry
 */
export function useErrorToast(options: UseErrorToastOptions = {}) {
	const { error, title, description, icon, actions, retry } = options;

	let actionButtons: UseErrorToastOptions["actions"] = actions ?? [];
	if (error?.value && retry) {
		actionButtons = [
			...actionButtons,
			{
				size: "sm",
				label: "Réessayer",
				color: "error",
				onClick: async () => {
					await retry();
					if (error?.value) {
						useErrorToast({ error: error });
					}
				},
			},
		];
	}

	useToast().add({
		title:
			title ??
			"Une erreur est survenue " +
				(error?.value ? ` (${error.value.statusCode})` : ""),
		description:
			description ??
			"Une erreur est survenue lors du traitement de votre demande.",
		icon: icon ?? "lucide:circle-alert",
		color: "error",
		actions: actionButtons,
	});
}
