# Qwizzy Frontend - Guide pour Agents IA

## Stack Technique

- **Framework**: Nuxt 4 + TypeScript
- **UI Library**: Nuxt UI v4 + TailwindCSS
- **State Management**: Pinia
- **Package Manager**: pnpm

## Particularités Nuxt 4

### Auto-imports

- **Vue**: `ref`, `computed`, `watch`, etc.
- **Composables**: `useState`, `useRouter`, `useFetch`, etc.
- **Composants**: Auto-importés depuis `components/`
- **Stores**: `usePinia`, `defineStore`, `storeToRefs`, `acceptHMRUpdate`, `use*Store` depuis `stores/` sont auto-importés
- **Utils**: Fonctions depuis `utils/` sont auto-importées
