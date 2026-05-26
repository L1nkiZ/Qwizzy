<script setup lang="ts">
import * as v from "valibot";

import { login } from "~/services/admin/auth.service";

import type { AuthFormField, FormSubmitEvent } from "@nuxt/ui";

const props = defineProps({
	title: { type: String, default: "Connexion" },
	icon: { type: String, default: "i-lucide-user" },
	cookieName: { type: String, default: "userTokenCookie" },
	redirectTo: { type: String, default: "/" },
	rememberDefault: { type: Boolean, default: true },
});

type Emits = {
	(e: "success", response: Awaited<ReturnType<typeof login>>): void;
	(e: "error", error: Error): void;
};

const emit = defineEmits<Emits>();

const fields = ref<AuthFormField[]>([
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
		defaultValue: props.rememberDefault,
	},
]);

const schema = v.object({
	email: v.pipe(
		v.string("Veuillez entrer une adresse email."),
		v.email("Veuillez entrer une adresse email valide."),
	),
	password: v.pipe(v.string("Le mot de passe doit être renseigné.")),
	remember: v.boolean("Veuillez indiquer si vous souhaitez rester connecté."),
});

type Schema = v.InferOutput<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
	await login(payload.data.email, payload.data.password)
		.then((response) => {
			const tokenCookie = useCookie(
				props.cookieName,
				payload.data.remember
					? {
							maxAge: 60 * 60 * 24 * 30,
						}
					: undefined,
			);

			tokenCookie.value = response.token;

			emit("success", response);

			navigateTo(props.redirectTo);
		})
		.catch((error) => {
			useErrorToast({
				title: "Erreur lors de la connexion",
				description: error.message,
			});

			emit("error", error);
		});
}
</script>

<template>
	<div class="mt-20 flex flex-1 items-center justify-center p-4">
		<UPageCard class="w-full max-w-md">
			<UAuthForm
				:title
				:icon
				:fields
				:schema
				class="max-w-md"
				@submit="onSubmit"
			>
				<template #description>
					<slot name="description" />
				</template>
			</UAuthForm>
		</UPageCard>
	</div>
</template>
