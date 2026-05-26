<script setup lang="ts" generic="T = unknown">
import { h, resolveComponent } from "vue";

import { getGroupedRowModel } from "@tanstack/vue-table";

import type {
	HiddenColumnForSearch,
	DataTableColumn,
} from "~/types/table.type";

import type { TableRow, TableProps, DropdownMenuProps } from "@nuxt/ui";
import type { HeaderContext } from "@tanstack/vue-table";

type Props = {
	data: T[];
	columns: DataTableColumn<T>[];
	hiddenColumnsForSearch?: HiddenColumnForSearch[];
	columnPinning?: Record<"left" | "right", string[]>;
	grouping?: string[];
	groupingOptions?: TableProps["groupingOptions"];
	userCanCreate?: boolean;
	rowActions?: (row: TableRow<T>) => DropdownMenuProps["items"];
	ui?: TableProps["ui"];
};

const props = withDefaults(defineProps<Props>(), {
	hiddenColumnsForSearch: () => [],
	columnPinning: undefined,
	grouping: undefined,
	groupingOptions: () => ({
		getGroupedRowModel: getGroupedRowModel(),
	}),
	userCanCreate: undefined,
	rowActions: undefined,
	ui: undefined,
});

const UButton = resolveComponent("UButton");

type Emits = {
	(e: "select", row: TableRow<T>): void;
	(e: "createElement"): void;
};

const emit = defineEmits<Emits>();

function createElement() {
	emit("createElement");
}

function onSelect(row: TableRow<T>) {
	emit("select", row);
}

const attrs = useAttrs();

// Sépare les attributs HTML (class, style, etc.) des props de UTable
const {
	class: className,
	style,
	...tableProps
} = attrs as Record<string, string>;

function sortingIcon(isSorted: false | "asc" | "desc") {
	return isSorted
		? isSorted === "asc"
			? "i-lucide-arrow-up-narrow-wide"
			: "i-lucide-arrow-down-wide-narrow"
		: "i-lucide-arrow-up-down";
}

const tableColumns: DataTableColumn<T>[] = [
	// Colonnes initiales avec gestion automatique du tri
	...props.columns.map((col) => ({
		...col,
		// Gestion du header avec bouton de tri automatique
		header: col.header
			? // Si un header est fourni
				col.notSortable
				? // Et que la colonne n'est pas triable, on utilise le header tel quel
					col.header
				: // Sinon, on wrappe le header avec le bouton de tri
					(context: HeaderContext<T, unknown>) => {
						const isSorted = context.column.getIsSorted();
						const header =
							typeof col.header === "function"
								? col.header(context)
								: col.header;
						return h("div", { class: "flex items-center gap-2" }, [
							h(UButton, {
								color: "neutral",
								variant: "ghost",
								class: "p-1",
								"aria-label":
									isSorted === "asc"
										? "Trier par ordre décroissant"
										: "Trier par ordre croissant",
								icon: sortingIcon(isSorted),
								onClick: () => context.column.toggleSorting(isSorted === "asc"),
							}),
							header,
						]);
					}
			: // Si pas de header on retourne une chaîne vide
				"",
	})),
	// On rajoute une colonne d'actions fixe à droite (géré dans la prop columnPinning)
	...(props.rowActions
		? [
				{
					accessorKey: "actions",
					meta: {
						// La colonne est en w-full pour prendre toute la place restante si aucune autre colonne n'est en w-full
						// On enlève le background qui est sur tout le <td> et on le remplace par un gradient custom pour avoir uniquement les 4 derniers rem remplis (équivalent au bouton d'action + padding)
						class: {
							th: "w-full",
							td: "bg-transparent bg-[linear-gradient(_to_right,_transparent_calc(100%_-_4rem),_color-mix(in_oklab,_var(--ui-bg)_75%,_transparent)_calc(100%_-_4rem)_)]",
						},
					},
				} as DataTableColumn<T>,
			]
		: []),
	// Colonnes cachées pour la recherche sur les traductions, formatages de dates ou de nombres, etc.
	...props.hiddenColumnsForSearch.map((col) => ({
		...col,
		notHideable: true,
		notSortable: true,
	})),
];

type TableComponent = {
	tableApi?: {
		getFilteredRowModel: () => { rows: { length: number } };
	};
};

const table = useTemplateRef<TableComponent>("table");

const slots = useSlots();

const searchFilter = ref<string>("");

const columnsToDisplay = computed(() => {
	return tableColumns.reduce<{ label: string; value: string }[]>(
		(acc, col) =>
			!col.notHideable && col.labelInColumnSelect
				? [...acc, { label: col.labelInColumnSelect, value: col.accessorKey }]
				: acc,
		[],
	);
});

// Récupère les colonnes à afficher sans les colonnes non-cachables ni la colonne actions
const selectedColumnsToDisplay = ref<string[]>(
	tableColumns.reduce<string[]>(
		(acc, col) =>
			col.accessorKey && !col.notHideable && col.accessorKey !== "actions"
				? [...acc, col.accessorKey]
				: acc,
		[],
	),
);

const columnVisibility = computed(() => {
	return Object.fromEntries(
		tableColumns.reduce<[string, boolean][]>((acc, col) => {
			if (!col.accessorKey) return acc;

			// Vérifie si la colonne est dans hiddenColumnsForSearch
			const isHiddenForSearch = props.hiddenColumnsForSearch.some(
				({ accessorKey }) => accessorKey === col.accessorKey,
			);

			// La colonne actions est toujours visible
			// Les colonnes notHideable sont toujours visibles, sauf si elles sont dans hiddenColumnsForSearch
			const isVisible =
				col.accessorKey === "actions" ||
				(col.notHideable && !isHiddenForSearch) ||
				selectedColumnsToDisplay.value.includes(col.accessorKey);

			return [...acc, [col.accessorKey, isVisible]];
		}, []),
	);
});

const numberOfDisplayedRows = computed<number>(() => {
	// Si la table est disponible et qu'il y a un filtre appliqué, on essaye d'accéder au nombre filtré
	if (table.value && searchFilter.value) {
		try {
			// Accéder à l'API de la table via le composant UTable
			if (table.value.tableApi) {
				return table.value.tableApi.getFilteredRowModel().rows.length;
			}
		} catch (error) {
			console.warn("Erreur lors de l'accès à l'API de la table :", error);
		}
	}

	// Sinon, retourne le nombre total
	return props.data?.length ?? 0;
});

const grouped = defineModel<boolean>("grouped", {
	default: false,
});

const columnPinning = ref<Record<"left" | "right", string[]>>({
	left: props.columnPinning?.left ?? [],
	right: ((): string[] => {
		const right = [
			...(props.columnPinning?.right ?? []),
			props.rowActions ? "actions" : "",
		];
		return right;
	})(),
});

const tableUi = computed(() => {
	const baseUi = {
		// permet de cacher les lignes vides dues aux lignes groupées (uniquement quand le slot d'expansion n'est pas utilisé)
		// et mettre une ligne sur deux en muted (possible que quand les lignes ne sont pas groupées)
		tr: [
			grouped.value &&
				!slots.expanded &&
				"[&:not([data-selected]):has(td:only-child)]:hidden",
			!grouped.value && !slots.expanded && "even:bg-muted",
			"data-[expanded=true]:bg-muted",
		]
			.filter(Boolean)
			.join(" "),
	};

	// Si une prop ui est fournie, on ajoute ses classes à celles de base
	if (props.ui) {
		const result = { ...baseUi };
		for (const key in props.ui) {
			if (props.ui[key as keyof typeof props.ui]) {
				result[key as keyof typeof result] = [
					baseUi[key as keyof typeof baseUi],
					props.ui[key as keyof typeof props.ui],
				]
					.filter(Boolean)
					.join(" ");
			}
		}
		return result;
	}

	return baseUi;
});
</script>

<template>
	<div
		:class="className"
		:style
		class="border-accented bg-default flex flex-col rounded-md border"
	>
		<AdminDataHeader
			v-model:search-filter="searchFilter"
			v-model:selected-columns-to-display="selectedColumnsToDisplay"
			:columns-to-display
		>
			<template #title>
				<slot
					name="header-title"
					:number-of-displayed-rows
					:number-of-total-rows="data?.length ?? 0"
				>
					Éléments {{ numberOfDisplayedRows }}
				</slot>
			</template>
			<template #trailing>
				<slot name="header-trailing" />
			</template>
		</AdminDataHeader>

		<!-- La key change en mode groupé/dégroupé pour que le composant se refresh bien -->
		<UTable
			ref="table"
			v-bind="tableProps"
			:key="`table-${grouped ? 'grouped' : 'ungrouped'}`"
			v-model:global-filter="searchFilter"
			v-model:column-visibility="columnVisibility"
			v-model:column-pinning="columnPinning"
			:grouping="grouped ? grouping : undefined"
			:grouping-options="grouped ? groupingOptions : undefined"
			:data
			:columns="tableColumns"
			sticky="header"
			:ui="tableUi"
			class="flex-1"
			@select="onSelect"
		>
			<template #empty>
				<AdminDataNoData
					v-if="!searchFilter"
					:user-can-create="props.userCanCreate"
					@create-element="createElement"
				/>
				<AdminDataNoResult v-else :term="searchFilter" />
			</template>

			<!-- Génération dynamique des slots header uniquement si le slot parent existe (pour pouvoir utiliser la clé "header" des columns) -->
			<template
				v-for="col in props.columns"
				:key="`${col.accessorKey}-header`"
				#[`${col.accessorKey}-header`]="slotProps"
			>
				<template v-if="slots[`${col.accessorKey}-header`]">
					<div v-if="!col.notSortable" class="flex items-center gap-2">
						<UButton
							color="neutral"
							variant="ghost"
							class="p-1"
							:aria-label="
								slotProps.column.getIsSorted() === 'asc'
									? 'Trier par ordre décroissant'
									: 'Trier par ordre croissant'
							"
							:icon="sortingIcon(slotProps.column.getIsSorted())"
							@click="
								slotProps.column.toggleSorting(
									slotProps.column.getIsSorted() === 'asc',
								)
							"
						/>
						<slot :name="`${col.accessorKey}-header`" v-bind="slotProps" />
					</div>
					<slot v-else :name="`${col.accessorKey}-header`" v-bind="slotProps" />
				</template>
			</template>

			<!-- Header de la colonne d'action avec texte caché pour l'a11y -->
			<template v-if="props.rowActions" #actions-header>
				<span class="sr-only">Actions</span>
			</template>

			<!-- Cellule d'action avec le bouton et les actions dans le dropdown -->
			<template v-if="props.rowActions" #actions-cell="{ row }">
				<div class="flex items-center justify-end">
					<UDropdownMenu
						v-if="!row.getIsGrouped()"
						:items="props.rowActions(row)"
						:content="{ align: 'end' }"
					>
						<UButton
							icon="i-lucide-ellipsis-vertical"
							color="neutral"
							variant="outline"
							aria-label="Actions"
						/>
					</UDropdownMenu>
				</div>
			</template>

			<!-- Génération dynamique des slots cell pour chaque colonne -->
			<template
				v-for="col in props.columns"
				:key="`${col.accessorKey}-cell`"
				#[`${col.accessorKey}-cell`]="slotProps"
			>
				<slot :name="`${col.accessorKey}-cell`" v-bind="slotProps" />
			</template>

			<template #expanded="{ row }">
				<slot name="expanded" v-bind="{ row }" />
			</template>
		</UTable>

		<!-- Footer -->
		<div class="border-accented text-muted border-t p-4 text-sm">
			<slot
				name="footer"
				:number-of-displayed-rows
				:number-of-total-rows="data?.length ?? 0"
			>
				{{ numberOfDisplayedRows }} éléments sur
				{{ data?.length ?? 0 }} affichés
			</slot>
		</div>
	</div>
</template>
