<script setup lang="ts">
interface Props {
	description?: string;
}
defineProps<Props>();
</script>

<template>
	<div class="text-muted flex flex-col items-center justify-center gap-2 p-4">
		<UIcon name="i-lucide-circle-alert" class="size-5" />
		<span class="text-sm font-medium">
			{{ description ?? "Une erreur est survenue" }}
		</span>
	</div>
</template>
