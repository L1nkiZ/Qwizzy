<script setup lang="ts">
import type { User } from "~/types/user.type";

import type { RadioGroupItem } from "@nuxt/ui";

interface Props {
	user: User;
}
const props = defineProps<Props>();

const roles: RadioGroupItem[] = [
	{
		label: "Administrateur",
		description: "Peut gérer les comptes et leurs rôles",
		value: "admin",
	},
	{
		label: "Rédacteur",
		description: "Peut ajouter, supprimer ou modifier le contenu des qwizzs",
		value: "editor",
	},
	{
		label: "Utilisateur",
		description: "Peut accéder aux qwizzs et y répondre",
		value: "user",
	},
];

// @ts-expect-error Besoin de refactor si feature réintégrée
const role = ref(props.user.role);
</script>

<template>
	<UModal
		:title="`Modifier le rôle de ${user.name}`"
		:ui="{ footer: 'justify-end' }"
		class="max-w-160"
	>
		<template #body>
			<UForm>
				<UFormField name="role">
					<URadioGroup
						v-model="role"
						required
						:items="roles"
						legend="Choix du rôle de l'utilisateur"
					/>
				</UFormField>
			</UForm>
		</template>

		<template #footer="{ close }">
			<UButton color="neutral" variant="outline" @click="close">Fermer</UButton>
			<UButton icon="i-lucide-save">Enregistrer</UButton>
		</template>
	</UModal>
</template>
