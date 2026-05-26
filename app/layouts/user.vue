<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const headerItems = computed<NavigationMenuItem[]>(() => [
	{
		label: "Les qwizz",
		to: "/qwizz",
		active: route.path.startsWith("/qwizz"),
	},
	{
		label: "Chat Code",
		to: "/chat-code",
		active: route.path.startsWith("/chat-code"),
	},
	{
		label: "Chien aléatoire",
		to: "/chien-aleatoire",
		active: route.path.startsWith("/chien-aleatoire"),
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
</script>

<template>
	<UHeader>
		<template #title>
			<AppLogo class="h-6 w-auto" />
		</template>
		<UNavigationMenu :items="headerItems" />
		<template #right>
			<UButton
				icon="i-lucide-user"
				color="neutral"
				variant="ghost"
				to="/compte"
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
