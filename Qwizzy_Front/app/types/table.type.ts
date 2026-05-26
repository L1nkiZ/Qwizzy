import type { TableColumn } from "@nuxt/ui";

export type HiddenColumnForSearch = {
	accessorKey: string;
};

export type DataTableColumn<T = unknown> = TableColumn<T> & {
	accessorKey: string;
	labelInColumnSelect?: string;
	notSortable?: boolean;
	notHideable?: boolean;
};
