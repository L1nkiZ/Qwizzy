<script setup lang="ts">
import { fetchCurrentUser } from "~/services/admin/auth.service";

useHead({
	title: "Qwizzy - Mon Compte",
	meta: [
		{
			name: "description",
			content: "Gérez vos informations de compte et vos qwizz sur Qwizzy.",
		},
	],
});

const { data: currentUser, error } = await fetchCurrentUser();

function handleLogout() {
	const adminTokenCookie = useCookie("adminTokenCookie");

	adminTokenCookie.value = null;

	navigateTo("/admin/connexion");
}
</script>

<template>
	<div>
		<UPageHeader title="Mon compte" class="mb-12" />

		<UAlert v-if="error" type="error">
			Une erreur est survenue lors du chargement de vos informations de compte.
			Veuillez vous déconnecter et vous reconnecter.
		</UAlert>

		<div
			class="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"
		>
			<UUser
				v-if="!error"
				:name="currentUser?.user.name"
				:description="currentUser?.user.email"
				size="2xl"
			/>
			<UButton
				color="error"
				variant="soft"
				class="size-fit"
				@click="handleLogout"
			>
				Se déconnecter
			</UButton>
		</div>
	</div>
</template>
