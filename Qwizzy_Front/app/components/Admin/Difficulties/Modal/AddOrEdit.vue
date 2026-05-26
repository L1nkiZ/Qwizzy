<script setup lang="ts">
import * as v from "valibot";

import {
	createDifficulty,
	updateDifficulty,
} from "~/services/admin/difficulties.service";
import type { Difficulty } from "~/types/difficulty.type";

interface Props {
	difficulty?: Difficulty;
	existingDifficulties?: Difficulty[];
	onSuccess?: () => void | Promise<void>;
}
const props = defineProps<Props>();

const editionMode = computed(() => !!props.difficulty);

const form = useTemplateRef<HTMLFormElement>("form");
const formId = useId();

const state = reactive<{
	name: string;
	point: number;
}>({
	name: props.difficulty?.name || "",
	point: props.difficulty?.point || 1,
});

const open = ref(false);
const pending = ref(false);
const closeModal = ref<(() => void) | null>(null);

const schema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(3, "Le nom doit faire au moins 3 caractères"),
		v.custom((name: unknown) => {
			const existingNames = (props.existingDifficulties || [])
				.filter((d) => d.id !== props.difficulty?.id)
				.map((d) => d.name.toLowerCase());
			return !existingNames.includes((name as string).toLowerCase());
		}, "Une difficulté avec ce nom existe déjà"),
	),
	point: v.pipe(v.number(), v.integer(), v.toMinValue(1), v.toMaxValue(65000)),
});

async function updateOrCreate() {
	form.value?.validate();
	// Si pas d'erreurs dans le form, on peut créer ou modifier la question
	if (form.value?.errors.length === 0) {
		try {
			pending.value = true;

			if (!props.difficulty) {
				await createDifficulty(state);
			} else {
				await updateDifficulty(props.difficulty.id, state);
			}

			await props.onSuccess?.();
			closeModal.value?.();
		} catch (error) {
			console.error("Erreur lors de la création/modification:", error);
			// L'erreur est déjà gérée par le plugin apiFetch
		} finally {
			pending.value = false;
		}
	}
}
</script>

<template>
	<UModal
		v-model:open="open"
		:title="editionMode ? 'Modifier la difficulté' : 'Ajouter une difficulté'"
		:ui="{ footer: 'justify-end' }"
		class="max-w-120"
	>
		<template #body>
			<UForm
				:id="formId"
				ref="form"
				:state
				:schema
				class="space-y-3"
				@submit="updateOrCreate"
			>
				<UFormField required name="name" label="Nom">
					<UInput v-model="state.name" required minlength="3" />
				</UFormField>

				<UFormField required name="point" label="Points">
					<UInputNumber
						v-model="state.point"
						required
						:min="1"
						:max="65000"
						class="w-full"
					/>
				</UFormField>
			</UForm>
		</template>

		<template #footer="{ close }">
			<UButton
				color="neutral"
				variant="outline"
				:disabled="pending"
				@click="close"
			>
				Fermer
			</UButton>
			<UButton
				type="submit"
				:form="formId"
				:loading="pending"
				@click="closeModal = close"
			>
				{{ editionMode ? "Modifier" : "Ajouter" }}
			</UButton>
		</template>
	</UModal>
</template>
