import { defineVitestProject } from "@nuxt/test-utils/config";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		projects: [
			// Tests nécessitant l'environnement Nuxt (notamment pour les autos-imports, etc.) donc placés dans le srcDir
			await defineVitestProject({
				test: {
					name: "nuxt",
					include: ["app/**/*.{test,spec}.ts"],
					environment: "nuxt",
				},
			}),
			// Tests ne nécessitant pas Nuxt et pouvant être exécutés plus rapidement dans un environnement Node.js, donc placés hors du srcDir
			{
				test: {
					name: "unit",
					include: ["test/{e2e,unit}/*.{test,spec}.ts"],
					environment: "node",
				},
			},
		],
	},
});
