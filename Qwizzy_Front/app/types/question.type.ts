export type Question = {
	id: number;
	question: string;
	subject: {
		id: number;
		name: string;
	};
	difficulty: {
		id: number;
		name: string;
	};
	proposal_1: string;
	proposal_2: string;
	proposal_3: string;
	proposal_4: string;
	answer: number;
	question_type: {
		id: 1;
		name: "J'suis pas sûr";
	};
};
