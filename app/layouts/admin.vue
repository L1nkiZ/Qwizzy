<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const isDesktop = useMediaQuery("(min-width: 1024px)");

const headerItems = computed<NavigationMenuItem[]>(() => [
	{
		label: "Questions",
		to: "/admin/questions",
		active: route.path.startsWith("/admin/questions"),
	},
	{
		label: "Catégories",
		to: "/admin/categories",
		active: route.path.startsWith("/admin/categories"),
	},
	{
		label: "Difficultés",
		to: "/admin/difficultes",
		active: route.path.startsWith("/admin/difficultes"),
	},
]);

const footerItems: NavigationMenuItem[] = [
	{
		label: "Mentions légales",
		to: "/mentions-legales",
	},
	{
		label: "Politique de confidentialité",
		to: "/politique-de-confidentialite",
	},
	{
		label: "Contact",
		to: "/contact",
	},
];

const groups = [
	{
		id: "links",
		label: "Paramétrage de l'application",
		items: headerItems.value,
	},
];

const open = ref(false);
</script>

<template>
	<UHeader to="/admin">
		<template #title>Qwizzy - Admin</template>
		<UNavigationMenu :items="headerItems" />
		<template #right>
			<UDashboardSearchButton
				:collapsed="!isDesktop"
				:variant="isDesktop ? 'outline' : 'ghost'"
				@click="open = true"
			/>
			<UButton
				icon="i-lucide-user"
				color="neutral"
				variant="ghost"
				to="/admin/compte"
			/>
			<UColorModeButton />
		</template>

		<template #body>
			<UNavigationMenu :items="headerItems" orientation="vertical" />
		</template>
	</UHeader>

	<UMain
		class="mx-auto max-w-(--ui-container) px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12"
	>
		<UDashboardSearch v-model:open="open" :groups />
		<slot />
	</UMain>

	<!-- eslint-disable-next-line -->
	<UFooter>
		<template #left>
			<p class="text-muted text-sm">
				Copyright © {{ new Date().getFullYear() }}
			</p>
		</template>
		<UNavigationMenu
			:items="footerItems"
			variant="link"
			:ui="{
				list: 'flex-col sm:flex-row',
			}"
		/>
		<template #right>
			<UButton
				icon="i-simple-icons-github"
				color="neutral"
				variant="ghost"
				to="https://github.com/L1nkiZ/Qwizzy_Front"
				target="_blank"
				aria-label="GitHub"
			/>
		</template>
	</UFooter>
</template>
