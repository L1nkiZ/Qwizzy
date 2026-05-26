<script setup lang="ts">
import * as v from "valibot";

import {
	createCategory,
	updateCategory,
} from "~/services/admin/categories.service";
import type { Category } from "~/types/category.type";

interface Props {
	category?: Category;
	existingCategories: Category[];
	onSuccess?: () => void | Promise<void>;
}
const props = defineProps<Props>();

const editionMode = computed(() => !!props.category);

const form = useTemplateRef<HTMLFormElement>("form");
const formId = useId();

const state = reactive<{
	name: string;
}>({
	name: props.category?.name || "",
});

const open = ref(false);
const pending = ref(false);
const closeModal = ref<(() => void) | null>(null);

const schema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(3, "Le nom doit faire au moins 3 caractères"),
		v.custom((name: unknown) => {
			const existingNames = (props.existingCategories || [])
				.filter((c) => c.id !== props.category?.id)
				.map((c) => c.name.toLowerCase());
			return !existingNames.includes((name as string).toLowerCase());
		}, "Une catégorie avec ce nom existe déjà"),
	),
});

async function updateOrCreate() {
	form.value?.validate();
	// Si pas d'erreurs dans le form, on peut créer ou modifier la question
	if (form.value?.errors.length === 0) {
		try {
			pending.value = true;

			if (!props.category) {
				await createCategory(state);
			} else {
				await updateCategory(props.category.id, state);
			}

			await props.onSuccess?.();
			closeModal.value?.();
		} catch (error) {
			useErrorToast({
				title: editionMode.value
					? "Erreur lors de la modification de la catégorie"
					: "Erreur lors de la création de la catégorie",
				description: (error as Error).message,
			});
		} finally {
			pending.value = false;
		}
	}
}
</script>

<template>
	<UModal
		v-model:open="open"
		:title="editionMode ? 'Modifier la catégorie' : 'Ajouter une catégorie'"
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
