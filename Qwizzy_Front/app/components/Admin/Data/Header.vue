<script setup lang="ts">
interface Props {
	title?: string;
	columnsToDisplay?: { label: string; value: string; disabled?: boolean }[];
}

defineProps<Props>();

const searchFilter = defineModel<string>("searchFilter");
const selectedColumnsToDisplay = defineModel<string[]>(
	"selectedColumnsToDisplay",
);
</script>

<template>
	<div
		class="border-accented flex flex-col items-start justify-between gap-4 border-b p-4 md:flex-row md:items-center"
	>
		<div class="text-sm font-medium">
			<slot name="title">
				<template v-if="title">
					{{ title }}
				</template>
			</slot>
		</div>
		<div class="flex w-full flex-col items-center gap-2 sm:flex-row md:w-fit">
			<slot name="leading" />
			<UFormField
				v-if="searchFilter !== undefined"
				label="Rechercher parmis les données"
				:ui="{ label: 'sr-only', container: 'mt-0' }"
				class="w-full md:w-50"
			>
				<UInput
					v-model="searchFilter"
					type="search"
					placeholder="Rechercher"
					trailing-icon="i-lucide-search"
				/>
			</UFormField>
			<UFormField
				v-if="columnsToDisplay"
				label="Colonnes affichées"
				:ui="{ label: 'sr-only', container: 'mt-0' }"
				class="w-full md:w-50"
			>
				<USelect
					v-model="selectedColumnsToDisplay"
					:items="columnsToDisplay"
					multiple
					placeholder="Colonnes affichées"
				/>
			</UFormField>
			<slot name="trailing" />
		</div>
	</div>
</template>
