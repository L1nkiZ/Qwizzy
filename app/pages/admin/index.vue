<script setup lang="ts">
import { fetchCategories } from "~/services/admin/categories.service";
import { fetchDifficulties } from "~/services/admin/difficulties.service";
import { fetchQuestions } from "~/services/admin/questions.service";

const { data: questions } = await fetchQuestions();
const { data: categories } = await fetchCategories();
const { data: difficulties } = await fetchDifficulties();
</script>

<template>
	<div>
		<h1 class="mb-8">Bienvenue sur l'administration de Qwizzy !</h1>

		<UPageGrid>
			<UPageCard
				to="/admin/questions"
				title="Nombre de questions créées :"
				spotlight
			>
				<span class="text-4xl">{{ questions?.questions.data.length }}</span>
			</UPageCard>
			<UPageCard
				to="/admin/categories"
				title="Nombre de catégories créées :"
				spotlight
			>
				<span class="text-4xl">{{ categories?.subject.data.length }}</span>
			</UPageCard>
			<UPageCard
				to="/admin/difficultes"
				title="Nombre de difficultés créées :"
				spotlight
			>
				<span class="text-4xl">{{ difficulties?.difficulty.data.length }}</span>
			</UPageCard>
		</UPageGrid>
	</div>
</template>
