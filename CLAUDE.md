# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Type-check + production build
npm run type-check   # TypeScript type checking (vue-tsc)
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
npm run test:unit    # Run unit tests with Vitest
```

## Architecture

This is a tile-based 2D browser game built with Vue 3, Vite, TypeScript, and Pinia.

### Core Game Structure

- **GameBlock.vue** (`src/components/GameBlock.vue`) — Main game engine component. Handles tile map rendering, character movement (WASD/arrows), camera system, collision detection, and object interaction (spacebar)
- **Maps** — JSON files in `/public/maps/` define tile layouts. Each tile has `tile` (background), `prop` (object), and `collision` properties
- **Tile System** (`src/utilites/tileList.ts`) — Defines MapElement types for tiles and props

### State Management (Pinia)

- **playerStore** — Player stats (health, oxygen, level, experience)
- **locationStore** — Current location and sub-location tracking
- **itemStore** — Inventory management (40 slots), item selection, stackable items

### Data Models

- **LocationsList.ts** — Location definitions with sub-locations, reputation system, map references
- **ItemsList.ts** — Item types (junk, ammo, medicine, weapon, suit, oxygen tank, tech) with quality tiers

### Routing

- `/` — Main game layout (MainBlock.vue) with child routes:
  - `/game` — Tile-based gameplay
  - `/map` — World map
  - `/inventory` — Player inventory
  - `/lobby` — Location hub
  - `/merchant` — Trading
- `/map-editor` — Map editing tool

### Key Conventions

- Path alias: `@/` maps to `src/`
- Tile size: 128px (CSS variable `--tile-size`)
- ESLint requires curly braces for all control structures
- Vue components use kebab-case in templates
