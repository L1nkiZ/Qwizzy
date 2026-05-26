<script setup lang="ts">
useHead({
	title: "Qwizzy - Connexion",
	meta: [
		{
			name: "description",
			content: "Connectez-vous à votre compte Qwizzy pour accéder à vos qwizz.",
		},
	],
});
</script>

<template>
	<AuthLoginForm title="Connexion">
		<template #description>
			Vous n'avez pas de compte ?
			<ULink to="/inscription" class="text-primary font-medium">
				Inscrivez-vous
			</ULink>
		</template>
	</AuthLoginForm>
</template>
