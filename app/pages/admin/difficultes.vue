<script setup lang="ts">
import {
	deleteDifficulty,
	fetchDifficulties,
} from "~/services/admin/difficulties.service";
import type { Difficulty } from "~/types/difficulty.type";

import type { DataTableColumn } from "~/types/table.type";

import { AdminDifficultiesModalAddOrEdit, AdminModalDelete } from "#components";

const {
	data: difficulties,
	status,
	error,
	refresh,
} = await fetchDifficulties();

const loadingFetch = computed(() => status.value === "pending");

const columns: DataTableColumn<Difficulty>[] = [
	{
		accessorKey: "name",
		labelInColumnSelect: "Nom",
		header: "Nom",
		notHideable: true,
	},
	{
		accessorKey: "point",

		labelInColumnSelect: "Points",
		header: "Points",
	},
	{
		accessorKey: "difficultiesActions",
		labelInColumnSelect: "Actions",
		notSortable: true,
		meta: { class: { th: "w-50", td: "space-x-2" } },
	},
];

const overlay = useOverlay();

const editOrAddModal = overlay.create(AdminDifficultiesModalAddOrEdit);

function openAddOrEditModal(difficulty?: Difficulty) {
	editOrAddModal.open({
		difficulty,
		existingDifficulties: difficulties.value?.difficulty.data,
		onSuccess: async () => {
			await refresh();
		},
	});
}

const deleteModal = overlay.create(AdminModalDelete);

function openDeleteModal(difficulty: Difficulty) {
	deleteModal.open({
		name: difficulty.name,
		onDelete: async () => {
			await deleteDifficulty(difficulty.id);
			await refresh();
		},
	});
}
</script>

<template>
	<UContainer>
		<div class="mb-12">
			<div class="mb-4 flex justify-between md:mb-8 lg:mb-10 lg:text-2xl">
				<h1 class="text-lg font-semibold md:text-xl">Difficultés</h1>
				<UButton
					icon="i-lucide-plus"
					class="size-fit"
					@click="openAddOrEditModal()"
				>
					Ajouter une difficulté
				</UButton>
			</div>
			<p class="mb-3">
				Toutes les difficultés possèdent un nom ainsi qu'un nombre de points
				utilisés pour calculer le score d'un joueur lorsqu'il répond
				correctement à une question de cette difficulté.
			</p>
		</div>

		<AdminDataLoading v-if="loadingFetch" />
		<AdminDataError v-else-if="error" />
		<AdminDataTable v-else :data="difficulties!.difficulty.data" :columns>
			<template #header-title="{ numberOfTotalRows }">
				Difficultés ({{ numberOfTotalRows }})
			</template>
			<template #difficultiesActions-cell="{ row }">
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
