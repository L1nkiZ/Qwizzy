<script setup lang="ts">
import * as v from "valibot";

import { fetchAnswer } from "~/services/admin/answer.service";
import { fetchDifficulties } from "~/services/admin/difficulties.service";
import {
	createQuestion,
	updateQuestion,
} from "~/services/admin/questions.service";
import { fetchSubjects } from "~/services/admin/subjects.service";
import type { Question } from "~/types/question.type";

interface Props {
	question?: Question;
	existingQuestions: Question[];
	onSuccess?: () => void | Promise<void>;
}
const props = defineProps<Props>();

const editionMode = !!props.question;

const { data: subjects, status: subjectStatus } = await fetchSubjects();

const subjectItems = computed(() =>
	subjects.value
		? (
				subjects.value as { subject: { data: { id: number; name: string }[] } }
			).subject.data.map((subject) => ({
				value: subject.id,
				label: subject.name,
			}))
		: [],
);

const { data: difficulties, status: difficultiesStatus } =
	await fetchDifficulties();

const difficultyItems = computed(() =>
	difficulties.value
		? (
				difficulties.value as {
					difficulty: { data: { id: number; name: string }[] };
				}
			).difficulty.data.map((difficulty) => ({
				value: difficulty.id,
				label: difficulty.name,
			}))
		: [],
);

type Answer = {
	question: {
		answers: { answer: string }[];
	};
};

const answer = ref<Answer | null>(null);

if (editionMode) {
	const { data: answerData } = await fetchAnswer(props.question?.id ?? 0);
	answer.value = answerData.value as Answer;
}

const questionAnswer = computed(() =>
	answer.value ? Number(answer.value.question.answers[0]?.answer) : null,
);

const form = useTemplateRef<HTMLFormElement>("form");
const formId = useId();

const pending = ref(false);
const closeModal = ref<(() => void) | null>(null);

const state = reactive<{
	title: string;
	subject?: { value: number; label: string };
	difficulty?: number;
	proposal_1: string;
	proposal_2: string;
	proposal_3: string;
	proposal_4: string;
	answer: number;
}>({
	title: props.question?.question || "",
	subject: props.question?.subject
		? {
				value: props.question.subject.id,
				label: props.question.subject.name,
			}
		: undefined,
	difficulty: props.question?.difficulty?.id ?? undefined,
	proposal_1: props.question?.proposal_1 || "",
	proposal_2: props.question?.proposal_2 || "",
	proposal_3: props.question?.proposal_3 || "",
	proposal_4: props.question?.proposal_4 || "",
	answer: questionAnswer?.value || 1,
});

const schema = v.object({
	title: v.pipe(
		v.string(),
		v.minLength(10, "Veuillez entrer un titre de minimum 10 caractères."),
		v.custom((title: unknown) => {
			const existingTitles = (props.existingQuestions || [])
				.filter((q) => q.id !== props.question?.id)
				.map((q) => q.question.toLowerCase());
			return !existingTitles.includes((title as string).toLowerCase());
		}, "Une question avec ce titre existe déjà"),
	),
	subject: v.pipe(
		v.object({
			value: v.number(),
			label: v.string(),
		}),
	),
	difficulty: v.pipe(v.number()),
	proposal_1: v.pipe(
		v.string(),
		v.nonEmpty("Veuillez entrer une proposition."),
	),
	proposal_2: v.pipe(
		v.string(),
		v.nonEmpty("Veuillez entrer une proposition."),
	),
	proposal_3: v.pipe(
		v.string(),
		v.nonEmpty("Veuillez entrer une proposition."),
	),
	proposal_4: v.pipe(
		v.string(),
		v.nonEmpty("Veuillez entrer une proposition."),
	),
	answer: v.pipe(
		v.number("Veuillez entrer un nombre entre 1 et 4"),
		v.minValue(1, "Veuillez entrer un nombre entre 1 et 4"),
		v.maxValue(4, "Veuillez entrer un nombre entre 1 et 4"),
	),
});

async function updateOrCreate() {
	form.value?.validate();
	// Si pas d'erreurs dans le form, on peut créer ou modifier la question
	if (form.value?.errors.length === 0) {
		try {
			pending.value = true;
			if (!props.question) {
				await createQuestion({
					question: state.title,
					proposal_1: state.proposal_1,
					proposal_2: state.proposal_2,
					proposal_3: state.proposal_3,
					proposal_4: state.proposal_4,
					subject_id: state.subject!.value,
					difficulty_id: state.difficulty!,
					correct_answer_number: state.answer,
					question_type_id: 1, // TODO: supprimer les types de questions
				});
			} else {
				await updateQuestion(props.question.id, {
					question: state.title,
					proposal_1: state.proposal_1,
					proposal_2: state.proposal_2,
					proposal_3: state.proposal_3,
					proposal_4: state.proposal_4,
					subject_id: state.subject!.value,
					difficulty_id: state.difficulty!,
					correct_answer_number: state.answer,
					question_type_id: props.question.question_type.id,
				});
			}

			await props.onSuccess?.();
			closeModal.value?.();
		} catch (error) {
			useErrorToast({
				title: editionMode
					? "Erreur lors de la modification de la question"
					: "Erreur lors de la création de la question",
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
		:title="editionMode ? 'Modifier la question' : 'Ajouter une question'"
		:description="props.question?.question"
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
				<UFormField required name="title" label="Titre">
					<UInput
						v-model="state.title"
						required
						placeholder="De quelle couleur est le cheval blanc d'Henri IV ?"
						minlength="10"
					/>
				</UFormField>
				<UFormField required name="subject" label="Sujet">
					<UInputMenu
						v-model="state.subject"
						:loading="subjectStatus === 'idle'"
						:items="subjectItems"
						required
					/>
				</UFormField>
				<UFormField required name="difficulty" label="Difficulté">
					<USelect
						v-model="state.difficulty"
						required
						:loading="difficultiesStatus === 'idle'"
						:items="difficultyItems"
					/>
				</UFormField>

				<USeparator label="Réponses" class="mt-8 mb-7" />

				<UFormField required name="proposal_1" label="Proposition 1">
					<UInput v-model="state.proposal_1" required />
				</UFormField>
				<UFormField required name="proposal_2" label="Proposition 2">
					<UInput v-model="state.proposal_2" required />
				</UFormField>
				<UFormField required name="proposal_3" label="Proposition 3">
					<UInput v-model="state.proposal_3" required />
				</UFormField>
				<UFormField required name="proposal_4" label="Proposition 4">
					<UInput v-model="state.proposal_4" required />
				</UFormField>

				<UFormField
					required
					name="answer"
					label="Numéro de la réponse correcte"
				>
					<UInputNumber
						v-model="state.answer"
						class="w-full"
						required
						:min="1"
						:max="4"
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
