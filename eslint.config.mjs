import withNuxt from "./.nuxt/eslint.config.mjs";
import checkFile from "eslint-plugin-check-file";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default withNuxt(
	{
		rules: {
			"vue/block-order": [
				"error",
				{
					order: ["script", "template", "style"],
				},
			],
			"vue/block-lang": [
				"error",
				{
					script: {
						lang: "ts",
					},
				},
			],
			"vue/padding-line-between-blocks": "error",
			"vue/enforce-style-attribute": ["error", { allow: ["scoped", "module"] }],
			"vue/no-unused-refs": "error",
			"vue/no-unused-emit-declarations": "error",
			"vue/no-useless-mustaches": [
				"error",
				{
					ignoreIncludesComment: false,
					ignoreStringEscape: false,
				},
			],
			"vue/no-useless-v-bind": [
				"error",
				{
					ignoreIncludesComment: false,
					ignoreStringEscape: false,
				},
			],
			"vue/prefer-true-attribute-shorthand": ["error", "always"],
			"vue/v-bind-style": [
				"error",
				"shorthand",
				{
					sameNameShorthand: "always",
				},
			],
			"no-else-return": "error",
			"no-param-reassign": "error",
			"vue/custom-event-name-casing": ["error", "camelCase"],
			"vue/no-restricted-syntax": [
				"error",
				{
					selector: "Identifier[name='$emit']",
					message: "Use 'emit' returned from 'defineEmits' instead of '$emit'.",
				},
			],
			"no-console": ["error", { allow: ["warn", "error", "info"] }],
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
		rules: {
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "typeLike",
					format: ["PascalCase"],
				},
			],
			"import/order": [
				"error",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						"parent",
						"sibling",
						"index",
						"object",
						"type",
					],
					pathGroups: [
						{
							pattern: "vue",
							group: "external",
							position: "before",
						},
						{
							pattern: "@**",
							group: "external",
						},
						{
							pattern: "~/**",
							group: "internal",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
					"newlines-between": "always-and-inside-groups",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
		},
	},
	{
		files: ["app/components/**/*.vue"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			// Interdire les fichiers nommés index.vue dans les composants pour favoriser le nommage explicite
			"check-file/filename-blocklist": [
				"error",
				{
					"**/index.vue": "*.vue",
					"**/Index.vue": "*.vue",
					"**/INDEX.vue": "*.vue",
				},
			],
			"check-file/folder-naming-convention": [
				"error",
				{
					"app/components/**/*": "PASCAL_CASE",
				},
			],
		},
	},
	{
		files: ["app/pages/**"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			// Utilise un pattern glob pour exclure les fichiers spéciaux [param].vue et (groupe).vue
			"check-file/filename-naming-convention": [
				"error",
				{
					"app/pages/**/!(*\\[*\\]*|*\\(*\\)*).*": "KEBAB_CASE",
				},
			],
			// NEXT_JS_APP_ROUTER_CASE supporte kebab-case + [param] + (groupe) + [...catchAll] etc.
			// Compatible avec les conventions de routing Nuxt 4
			"check-file/folder-naming-convention": [
				"error",
				{
					"app/pages/**/": "NEXT_JS_APP_ROUTER_CASE",
				},
			],
		},
	},
	{
		files: ["app/services/**/*.*", "app/stores/**/*.*", "app/types/**/*.*"],
		plugins: {
			"check-file": checkFile,
		},
		rules: {
			"check-file/filename-naming-convention": [
				"error",
				{
					"app/services/**/*.!(test|spec).*": "*.service",
					"app/stores/**/*.!(test|spec).*": "*.store",
					"app/types/**/*.!(test|spec).*": "*.type",
				},
			],
		},
	},
	eslintConfigPrettier,
	// rules qui doivent être appliquées après la config Prettier pour l'override
	{
		rules: {
			"vue/html-self-closing": [
				"error",
				{
					html: {
						void: "always",
						normal: "always",
						component: "always",
					},
				},
			],
		},
	},
);
