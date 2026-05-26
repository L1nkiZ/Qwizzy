<script setup lang="ts">
interface Props {
	name: string;
	onDelete: () => void;
}
const props = defineProps<Props>();
</script>

<template>
	<UModal title="Suppression" :ui="{ footer: 'justify-end' }" class="max-w-160">
		<template #body>
			<p>
				Êtes-vous sûr de vouloir supprimer "{{ props.name }}" ? Cette action est
				irréversible.
			</p>
		</template>

		<template #footer="{ close }">
			<UButton color="neutral" variant="outline" @click="close">
				Annuler
			</UButton>
			<UButton
				autofocus
				color="error"
				icon="i-lucide-trash-2"
				@click="(props.onDelete?.(), close())"
			>
				Supprimer
			</UButton>
		</template>
	</UModal>
</template>
