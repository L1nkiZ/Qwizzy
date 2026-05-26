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
	<AuthLoginForm
		cookie-name="adminTokenCookie"
		redirect-to="/admin"
		title="Connexion"
	/>
</template>
