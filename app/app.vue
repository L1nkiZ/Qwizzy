<script setup lang="ts">
import { fr } from "@nuxt/ui/locale";
</script>

<template>
	<Html lang="fr" dir="ltr">
		<UApp :locale="fr">
			<NuxtLayout>
				<NuxtRouteAnnouncer />
				<NuxtPage />
			</NuxtLayout>
		</UApp>
	</Html>
</template>
