<script setup lang="ts">
import type { DataTableColumn } from "~/types/table.type";
import type { User } from "~/types/user.type";

import { AdminUsersRoleModal } from "#components";

const data: User[] = [
	// @ts-expect-error Besoin de refactor si feature réintégrée
	{ id: 1, name: "John Doe", email: "john.doe@example.com", role: "admin" },
	// @ts-expect-error Besoin de refactor si feature réintégrée
	{ id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "admin" },
];

const enrichedData: User[] = data.map((user) => ({
	...user,
	// @ts-expect-error Besoin de refactor si feature réintégrée
	translatedRole: displayRoleName(user.role),
}));

const columns: DataTableColumn<User>[] = [
	{
		accessorKey: "name",
		labelInColumnSelect: "Nom complet",
		notHideable: true,
	},
	{
		accessorKey: "email",
		labelInColumnSelect: "Email",
	},
	{
		accessorKey: "role",
		labelInColumnSelect: "Rôle",
	},
	{
		accessorKey: "userActions",
		labelInColumnSelect: "Actions",
		notSortable: true,
		meta: { class: { th: "w-45" } },
	},
];

const hiddenColumnsForSearch = [{ accessorKey: "translatedRole" }];

const overlay = useOverlay();
const roleModal = overlay.create(AdminUsersRoleModal);

function openRoleModal(user: User) {
	roleModal.open({ user: user });
}

function displayRoleName(role: string): string {
	switch (role) {
		case "admin":
			return "Administrateur";
		case "editor":
			return "Rédacteur";
		case "user":
			return "Utilisateur";
		default:
			return "Inconnu";
	}
}
</script>

<template>
	<UContainer>
		<div class="mb-12">
			<h1
				class="mb-4 text-lg font-semibold md:mb-8 md:text-xl lg:mb-10 lg:text-2xl"
			>
				Utilisateurs
			</h1>
			<p class="mb-3">
				Tous les rôles possèdent les capacités du niveau inférieur.
			</p>
			<ul>
				<li>
					<b>Administrateur :</b>
					Peut gérer les comptes et leurs rôles
				</li>
				<li>
					<b>Rédacteur :</b>
					Peut ajouter, supprimer ou modifier le contenu des qwizzs
				</li>
				<li>
					<b>Utilisateur :</b>
					Peut accéder aux qwizzs et y répondre
				</li>
			</ul>
		</div>

		<AdminDataTable :data="enrichedData" :columns :hidden-columns-for-search>
			<template #header-title="{ numberOfTotalRows }">
				Utilisateurs ({{ numberOfTotalRows }})
			</template>

			<template #name-header>Nom complet</template>

			<template #email-header>Email</template>

			<template #role-header>Rôle</template>

			<template #role-cell="{ row }">
				{{ displayRoleName(row.original.role) }}
			</template>

			<template #userActions-header>Actions</template>

			<template #userActions-cell="{ row }">
				<UButton
					trailing-icon="i-lucide-settings"
					color="neutral"
					variant="outline"
					@click="openRoleModal(row.original)"
				>
					Modifier le rôle
				</UButton>
			</template>
		</AdminDataTable>
	</UContainer>
</template>
