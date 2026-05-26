<script setup lang="ts">
type Props = {
	userCanCreate?: boolean | "never";
	description?: string;
	action?: string;
};
withDefaults(defineProps<Props>(), {
	userCanCreate: "never",
	description: undefined,
	action: undefined,
});

interface Emits {
	(createElement: "createElement"): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<UIcon
			v-if="userCanCreate === 'never'"
			name="i-lucide-database"
			class="text-muted size-5"
		/>
		<span class="text-muted text-sm font-medium">
			{{ description ?? "Pas d'éléments" }}
		</span>
		<AdminTooltipUserNotAllowed
			v-if="userCanCreate !== 'never'"
			:show="!userCanCreate"
		>
			<UButton
				type="button"
				:aria-disabled="!userCanCreate"
				size="xs"
				@click="userCanCreate ? emit('createElement') : null"
			>
				{{ action ?? "Créer un élément" }}
				<span v-if="!userCanCreate" class="sr-only">
					(L'utilisateur n'a pas la permission)
				</span>
			</UButton>
		</AdminTooltipUserNotAllowed>
	</div>
</template>
