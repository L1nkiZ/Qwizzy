<script setup lang="ts">
import * as v from "valibot";

import { register } from "~/services/admin/auth.service";

import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";

useHead({
	title: "Qwizzy - Inscription",
	meta: [
		{
			name: "description",
			content: "Créez un compte pour accéder à vos scores et bien plus !",
		},
	],
});

const fields = ref<AuthFormField[]>([
	{
		required: true,
		name: "username",
		type: "text",
		label: "Nom d'utilisateur",
	},
	{
		required: true,
		name: "email",
		type: "email",
		label: "Email",
	},
	{
		required: true,
		name: "password",
		type: "password",
		label: "Mot de passe",
	},
	{
		required: true,
		name: "remember",
		label: "Remember me",
		type: "checkbox",
		defaultValue: true,
	},
]);

const schema = v.object({
	username: v.pipe(v.string("Le nom d'utilisateur doit être renseigné.")),
	email: v.pipe(
		v.string("Veuillez entrer une adresse email."),
		v.email("Veuillez entrer une adresse email valide."),
	),
	password: v.pipe(v.string("Le mot de passe doit être renseigné.")),
	remember: v.boolean("Veuillez indiquer si vous souhaitez rester connecté."),
});

type Schema = v.InferOutput<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
	await register(
		payload.data.username,
		payload.data.email,
		payload.data.password,
	)
		.then((response) => {
			const tokenCookie = useCookie(
				"userTokenCookie",
				payload.data.remember
					? {
							maxAge: 60 * 60 * 24 * 30,
						}
					: undefined,
			);

			tokenCookie.value = response.token;

			navigateTo("/");
		})
		.catch((error) => {
			useErrorToast({
				title: "Erreur lors de la connexion",
				description: error.message,
			});
		});
}
</script>

<template>
	<div class="mt-20 flex flex-1 items-center justify-center p-4">
		<UPageCard class="w-full max-w-md">
			<UAuthForm
				title="Inscription"
				description="Créez un compte pour accéder à vos scores et bien plus !"
				icon="i-lucide-user-round-plus"
				:schema
				:fields
				class="max-w-md"
				@submit="onSubmit"
			>
				<template #description>
					Vous avez déjà un compte ?
					<ULink to="/connexion" class="text-primary font-medium">
						Connectez-vous
					</ULink>
				</template>
			</UAuthForm>
		</UPageCard>
	</div>
</template>
