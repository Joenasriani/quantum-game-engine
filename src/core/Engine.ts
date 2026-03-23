// Engine.ts

// Importing required modules
import { SceneManager } from './SceneManager';
import { Physics } from './Physics';
import { InputManager } from './InputManager';
import { Camera } from './Camera';

class GameEngine {
    private sceneManager: SceneManager;
    private physics: Physics;
    private inputManager: InputManager;
    private camera: Camera;
    private lastTime: number;

    constructor() {
        this.sceneManager = new SceneManager();
        this.physics = new Physics();
        this.inputManager = new InputManager();
        this.camera = new Camera();
        this.lastTime = performance.now();
    }

    public start(): void {
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(currentTime: number): void {
        const deltaTime = (currentTime - this.lastTime) / 1000; // seconds
        this.lastTime = currentTime;

        // Update input system
        this.inputManager.update();

        // Update physics
        this.physics.update(deltaTime);

        // Check collisions
        this.physics.checkCollisions();

        // Render the current scene
        this.sceneManager.render(this.camera);

        // Request the next frame
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// Exporting the GameEngine class
export default GameEngine;