<script setup lang="ts">
interface Props {
	description?: string;
}
defineProps<Props>();
</script>

<template>
	<div class="text-muted flex flex-col items-center justify-center gap-2 p-4">
		<UIcon name="i-lucide-loader" class="size-5 animate-spin" />
		<span class="text-sm font-medium">
			{{ description ?? "Chargement en cours" }}
		</span>
	</div>
</template>
