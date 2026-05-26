# Fonctionnement du composant AdminDataTable

Composant générique wrappant `<UTable>` de Nuxt UI pour simplifier la création de tableaux de données avec recherche, filtrage de colonnes, actions par ligne et états vides.

Ci-dessous sont listés **UNIQUEMENT** les props et events supplémentaires OU différents de `<UTable>`

## Props

### `columns` (required)

- **Type**: `DataTableColumn<T>[]`
- **Description**: Configuration des colonnes. Chaque colonne peut avoir, en plus de ce qu'accepte NuxtUI :
  - `labelInColumnSelect`: Label affiché dans le sélecteur de colonnes
  - `notSortable`: Désactive le tri sur cette colonne ( => pas de bouton de tri de la colonne)
  - `notHideable`: Empêche de masquer cette colonne ( => pas dans les items du select dans le header)

### `hiddenColumnsForSearch`

- **Type**: `HiddenColumnForSearch[]`
- **Default**: `[]`
- **Description**: Colonnes invisibles mais indexées pour la recherche (ex: traductions, dates formatées, etc.)

### `columnPinning`

- **Type**: `{ left?: string[], right?: string[] }`
- **Description**: Identique à celle de `<UTable>` + la colonne `actions` est automatiquement épinglée à droite

### `groupingOptions`

- **Type**: `TableProps["groupingOptions"]`
- **Description**: Identique à celle de `<UTable>` mais on a par défaut le regroupement automatique de tanstack via un import.

### `userCanCreate`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Affiche le bouton de création quand les données sont vides

### `rowActions` (required)

- **Type**: `(row: TableRow<T>) => DropdownMenuProps['items']`
- **Description**: Fonction retournant les actions disponibles pour chaque ligne

### `ui`

- **Type**: `TableProps["ui"]`
- **Description**: Des classes sont déjà appliquées par le composant. Si la props est fournie, elles seront simplément rajoutées

## Events

### `@create-element`

- **Description**: Émis lors du clic sur le bouton de création (état vide)

## Le header (AdminDataHeader)

Section supérieure avec recherche et contrôles.

### Slots disponibles

#### `header-title`

- **Props**: `{ numberOfDisplayedRows: number, numberOfTotalRows: number }`
- **Description**: Titre personnalisé à gauche

#### `header-trailing`

- **Description**: Contrôles supplémentaires après la recherche et le sélecteur de colonnes

## La table (`<UTable>`)

Tableau avec gestion automatique de :

- Recherche globale filtrée
- Tri par colonne (icônes dynamiques)
- Visibilité des colonnes
- Épinglage des colonnes
- Regroupement optionnel
- Actions par ligne (colonne fixe à droite)

### Slots disponibles

Identiques à ceux de la documentation NuxtUI.

### États vides

#### Aucune donnée (`AdminDataNoData`)

- Affiché quand `data` est vide et qu'il n'y a pas de recherche
- Bouton de création si `userCanCreate = true`
- Emit `create-element` au clic du bouton

#### Aucun résultat (`AdminDataNoResult`)

- Affiché quand la recherche ne retourne aucun résultat
- Affiche le terme recherché

## Le footer

Barre inférieure avec résumé.

### Slot disponible

#### `footer`

- **Props**: `{ numberOfDisplayedRows: number, numberOfTotalRows: number }`
- **Description**: Personnalise le contenu du footer
- **Default**: Affiche le nombre d'éléments affichés vs total

## Exemple complet

Voir [components/Admin/Shop/Table.vue](../Shop/Table.vue) pour un exemple d'implémentation avec :

- Colonnes personnalisées
- Regroupement par service
- Badges de statut
- Actions (éditer, dupliquer, supprimer)
- Traductions pour la recherche
- Navigation au clic

## Particularités techniques

### Recherche enrichie

Les colonnes dans `hiddenColumnsForSearch` sont invisibles mais indexées. Utile pour :

- Rechercher sur des traductions (`statusTranslated`)
- Rechercher sur des dates formatées (`updatedAtFormatted`)

### Tri automatique

Les colonnes non marquées `notSortable` ont un bouton de tri avec icône dynamique :

- `i-lucide-arrow-up-down` : non trié
- `i-lucide-arrow-up-narrow-wide` : tri croissant
- `i-lucide-arrow-down-wide-narrow` : tri décroissant

### Mode groupé

Quand `grouped` est activé :

- Les lignes groupées sont repliables/dépliables
- La key du composant change pour forcer le refresh
- Les lignes vides dues au groupement sont masquées (si pas de slot `expanded`)
- Le style zebré est désactivé

### Classes CSS

- `th`: Overflow hidden avec ellipsis
- `td`: Max-width à 0 pour toutes sauf la colonne actions (permet l'ellipsis sur texte long)
- Lignes paires en `bg-muted` (si pas groupé et pas de slot `expanded`)
- Lignes dépliées en `bg-muted`
