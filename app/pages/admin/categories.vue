<script setup lang="ts">
import {
	deleteCategory,
	fetchCategories,
} from "~/services/admin/categories.service";
import type { Category } from "~/types/category.type";

import type { DataTableColumn } from "~/types/table.type";

import { AdminCategoriesModalAddOrEdit, AdminModalDelete } from "#components";

const { data: categories, pending, error, refresh } = await fetchCategories();

const columns: DataTableColumn<Category>[] = [
	{
		accessorKey: "name",
		labelInColumnSelect: "Nom",
		notHideable: true,
	},
	{
		accessorKey: "categoryActions",
		labelInColumnSelect: "Actions",
		notSortable: true,
		meta: { class: { th: "w-50", td: "space-x-2" } },
	},
];

const overlay = useOverlay();

const editOrAddModal = overlay.create(AdminCategoriesModalAddOrEdit);

function openAddOrEditModal(category?: Category) {
	editOrAddModal.open({
		category: category,
		existingCategories: categories?.value?.subject.data || [],
		onSuccess: async () => {
			await refresh();
		},
	});
}

const deleteModal = overlay.create(AdminModalDelete);

function openDeleteModal(category: Category) {
	deleteModal.open({
		name: category.name,
		onDelete: async () => {
			await deleteCategory(category.id);
			await refresh();
		},
	});
}
</script>

<template>
	<UContainer>
		<div class="mb-12">
			<div class="mb-4 flex justify-between md:mb-8 lg:mb-10 lg:text-2xl">
				<h1 class="text-lg font-semibold md:text-xl">Catégories</h1>
				<UButton
					icon="i-lucide-plus"
					class="size-fit"
					@click="openAddOrEditModal()"
				>
					Ajouter une catégorie
				</UButton>
			</div>
			<p class="mb-3">
				Toues les catégories possèdent un nom. Vous pouvez rattacher une
				question à une catégorie.
			</p>
		</div>

		<AdminDataLoading v-if="pending" />
		<AdminDataError v-else-if="error" />
		<AdminDataTable
			v-else
			:data="categories?.subject.data as Category[]"
			:columns
		>
			<template #header-title="{ numberOfTotalRows }">
				Catégories ({{ numberOfTotalRows }})
			</template>

			<template #name-header>Nom</template>

			<template #categoryActions-cell="{ row }">
				<UButton
					trailing-icon="i-lucide-settings"
					color="neutral"
					variant="outline"
					@click="openAddOrEditModal(row.original)"
				>
					Modifier
				</UButton>
				<UButton
					trailing-icon="i-lucide-trash-2"
					color="error"
					variant="soft"
					@click="openDeleteModal(row.original)"
				>
					Supprimer
				</UButton>
			</template>
		</AdminDataTable>
	</UContainer>
</template>
