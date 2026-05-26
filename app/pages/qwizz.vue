<script setup lang="ts">
import * as v from "valibot";

import { fetchCategories } from "~/services/admin/categories.service";
import {
	getCorrectAnswer,
	getPossibleAnswers,
	getQuestions,
} from "~/services/user/quiz.service";

useHead({
	title: "Qwizzy - Qwizz",
	meta: [
		{
			name: "description",
			content:
				"Découvrez une variété de qwizz sur différents sujets et testez vos connaissances avec Qwizzy.",
		},
	],
});

const { data: categoriesFetch } = await fetchCategories();
const pending = ref(false);

const questions = ref<
	{
		id: number;
		subject: string;
		title: string;
	}[]
>([]);
const currentQuestion = computed(() =>
	questions.value.length > 0 ? questions.value[questionIndex.value - 1] : null,
);

// steps variables
const questionIndex = ref(0);
const possibleAnswers = ref<
	| {
			position: number;
			label: string;
	  }[]
	| ["freetry"]
>([]);
const textAnswer = ref("");
const answerResult = ref("");

const form = useTemplateRef<HTMLFormElement>("form");
const formId = useId();

const categories = computed(() =>
	categoriesFetch.value
		? categoriesFetch.value.subject.data.map((category) => ({
				value: category.id,
				label: category.name,
			}))
		: [],
);

const state = reactive<{
	numberOfQuestions: number;
	category?: {
		value: number;
		label: string;
	};
}>({
	numberOfQuestions: 5,
});

const schema = v.object({
	numberOfQuestions: v.pipe(
		v.number(),
		v.minValue(1, "Le nombre de questions doit être au moins 1"),
		v.maxValue(20, "Le nombre de questions doit être au maximum 20"),
	),
	category: v.optional(
		v.object({
			value: v.number(),
			label: v.string(),
		}),
	),
});

async function generateQuiz() {
	form.value?.validate();
	questionIndex.value = 0;
	questions.value = [];

	// Si pas d'erreurs dans le form, on peut créer ou modifier la question
	if (form.value?.errors.length === 0) {
		try {
			pending.value = true;

			const response = await getQuestions({
				numberOfQuestions: state.numberOfQuestions,
				categoryId: state.category?.value,
			});

			questions.value = response.questions;

			questionIndex.value = 1;
		} catch (error) {
			useErrorToast({
				title: "Erreur lors de la génération du quiz",
				description: (error as Error).message,
			});
		} finally {
			pending.value = false;
		}
	}
}

async function getQuestionAnswers(question_id: number, mode: 1 | 2 | 3) {
	try {
		const response = await getPossibleAnswers({
			question_id,
			mode,
		});

		if (mode === 3) {
			possibleAnswers.value = ["freetry"];
		} else {
			possibleAnswers.value = response.proposals;
		}
	} catch (error) {
		useErrorToast({
			title: "Erreur lors de la récupération des réponses possibles",
			description: (error as Error).message,
		});
	}
}

async function checkAnswer(options: {
	answer?: { position: number; label: string };
	freetryAnswer?: string;
	question_id: number;
}) {
	try {
		const response = await getCorrectAnswer({
			question_id: options.question_id,
		});

		if (options.freetryAnswer) {
			if (
				options.freetryAnswer.toLowerCase() ===
				response.correct_answer_label.toLowerCase()
			) {
				answerResult.value = "Bien joué !";
			} else {
				answerResult.value = `Mauvaise réponse ! La bonne réponse était : ${response.correct_answer_label}`;
			}
		} else if (options.answer) {
			if (response.correct_answer_position === options.answer?.position) {
				answerResult.value = "Bien joué !";
			} else {
				answerResult.value = `Mauvaise réponse ! La bonne réponse était : ${response.correct_answer_label}`;
			}
		}
	} catch (error) {
		useErrorToast({
			title: "Erreur lors de la récupération de la bonne réponse",
			description: (error as Error).message,
		});
	}
}

function nextStep() {
	possibleAnswers.value = [];
	textAnswer.value = "";
	answerResult.value = "";

	if (questionIndex.value === questions.value.length) {
		// Fin du quiz
		questionIndex.value = 0;
		questions.value = [];
		return;
	}
	questionIndex.value += 1;
}
</script>

<template>
	<div>
		<h1 class="mb-20 text-center text-2xl">
			Générez un quiz et répondez aux questions que nous vous proposerons !
		</h1>

		<UPageCard
			v-if="questionIndex === 0 && !currentQuestion"
			class="mx-auto max-w-100"
		>
			<UForm
				:id="formId"
				ref="form"
				:state
				:schema
				class="space-y-4"
				@submit.prevent="generateQuiz"
			>
				<UFormField
					required
					name="numberOfQuestions"
					label="Nombre de questions"
				>
					<UInputNumber
						v-model="state.numberOfQuestions"
						required
						:min="1"
						:max="20"
					/>
				</UFormField>
				<UFormField name="category" label="Catégorie (optionnel)">
					<UInputMenu
						v-model="state.category"
						placeholder="Sélectionnez une catégorie"
						:items="categories"
					/>
				</UFormField>

				<UButton type="submit" :form="formId" block>Générer un quiz !</UButton>
			</UForm>
		</UPageCard>

		<div v-else class="mx-auto max-w-160">
			<h2 class="mb-6 text-xl">
				Question {{ questionIndex }} / {{ questions.length }}
			</h2>

			<UCard :ui="{ header: 'font-semibold' }">
				<template #header>
					{{ currentQuestion!.subject }}
				</template>

				<div class="space-y-6">
					<p class="text-xl font-extralight">
						{{ currentQuestion!.title }}
					</p>

					<div
						v-if="possibleAnswers.length === 0"
						class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
					>
						<UButton
							block
							variant="outline"
							color="neutral"
							@click="getQuestionAnswers(currentQuestion!.id, 1)"
						>
							J'suis pas sûr
						</UButton>
						<UButton
							block
							variant="soft"
							color="info"
							@click="getQuestionAnswers(currentQuestion!.id, 2)"
						>
							J'crois je l'ai
						</UButton>
						<UButton block @click="getQuestionAnswers(currentQuestion!.id, 3)">
							Let me cook
						</UButton>
					</div>

					<template v-else>
						<div
							v-if="possibleAnswers.length !== 1"
							class="grid grid-cols-2 gap-4"
						>
							<template v-if="!answerResult">
								<UButton
									v-for="(answer, index) in possibleAnswers"
									:key="index"
									variant="soft"
									color="neutral"
									block
									@click="
										checkAnswer({
											// @ts-expect-error Type de answer incorrect à cause de la réponse freetry qui a une structure différente
											answer,
											question_id: currentQuestion!.id,
										})
									"
								>
									{{
										// @ts-expect-error Type de answer incorrect à cause de la réponse freetry qui a une structure différente
										answer.label
									}}
								</UButton>
							</template>
						</div>

						<template v-else>
							<UFormField label="Saisir la bonne réponse" required>
								<UInput v-model="textAnswer" required />
							</UFormField>
							<UButton
								v-if="!answerResult"
								block
								variant="outline"
								color="neutral"
								@click="
									checkAnswer({
										freetryAnswer: textAnswer,
										question_id: currentQuestion!.id,
									})
								"
							>
								Vérifier
							</UButton>
						</template>

						<div v-if="answerResult">
							<div class="mb-4">{{ answerResult }}</div>
							<UButton block @click="nextStep">Continuer</UButton>
						</div>
					</template>
				</div>
			</UCard>
		</div>
	</div>
</template>
