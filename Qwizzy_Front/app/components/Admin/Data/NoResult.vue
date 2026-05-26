<script setup lang="ts">
interface Props {
	term: string;
}
defineProps<Props>();
</script>

<template>
	<div class="text-muted flex flex-col items-center justify-center gap-2 p-4">
		<UIcon name="i-lucide-search" class="size-6" />
		<span class="text-sm">Pas de résultat pour "{{ term }}"</span>
	</div>
</template>
