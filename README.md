# Quantum Game Engine

Quantum Game Engine is an experimental TypeScript browser game-engine prototype.

The repository contains several engine-oriented source modules, a Webpack/TypeScript toolchain, and a separate browser platformer example. The project name is conceptual: the current implementation does **not** provide quantum computing, quantum algorithms, quantum hardware integration, or a scientific quantum-mechanics simulator.

## Current Scope

Implemented or partially implemented source areas include:

- scene representation
- game-object representation
- 2D vector utilities
- prefab utilities
- state management
- tilemap structures and management
- tween management and easing
- an engine loop based on `requestAnimationFrame`

The repository is best treated as a prototype codebase rather than a complete production game engine.

## Source Layout

```text
.
├── index.html
├── package.json
├── tsconfig.json
├── webpack.config.js
└── src/
    ├── core/
    ├── systems/
    └── index.ts
```

### TypeScript source

The `src/` tree contains the engine-oriented modules.

Examples include:

- `core/Engine.ts`
- `core/Scene.ts`
- `core/GameObject.ts`
- `core/Vector2.ts`
- `systems/Prefab.ts`
- `systems/StateManager.ts`
- `systems/Tilemap.ts`
- `systems/TweenManager.ts`

`Engine.ts` defines a browser animation loop that updates input and physics, checks collisions, renders through a scene manager, and schedules the next frame.

### Browser example

The root `index.html` is a standalone Canvas 2D platformer example. It implements:

- gravity
- jumping with the Up Arrow key
- platform collision
- a collectible
- score tracking
- a `requestAnimationFrame` game loop

The example contains its own JavaScript and should not be interpreted as evidence that every TypeScript engine subsystem is integrated into that demo.

## Prototype Limitations

The current source tree is incomplete in several areas.

`src/core/Engine.ts` imports the following modules:

- `SceneManager`
- `Physics`
- `InputManager`
- `Camera`

Those files are not present at the referenced `src/core/` paths in the current repository.

The Webpack entry point, `src/index.ts`, currently exports placeholder `Engine`, `Scene`, and `GameObject` classes rather than wiring the deeper source modules into the package entry.

Because of those gaps, the repository should not be described as a verified, production-ready engine or as having a confirmed clean build in its present state.

The package manifest also declares `three`, `cannon-es`, and `earcut`, but their presence in `package.json` alone does not establish implemented 3D rendering, physics integration, or polygon-processing features.

## Tooling

The repository defines the following npm scripts:

```bash
npm install
npm run build
npm run dev
npm test
npm run lint
npm run format
```

These commands are declared by `package.json`. Given the unresolved source imports described above, successful execution of the full build is not asserted here.

## Scope Boundary

The current implementation does not establish:

- quantum-computing functionality
- a scientific quantum simulator
- a complete 3D editor or renderer
- production-ready physics integration
- AR, VR, or WebXR support
- console deployment
- a complete commercial game-engine toolchain

This repository documents an experimental browser game-engine codebase and its current implementation state.
