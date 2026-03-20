import GameObject from './GameObject';

class Scene {
    id: string;
    name: string;
    gameObjects: GameObject[];
    isActive: boolean;

    constructor(name: string) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.gameObjects = [];
        this.isActive = false;
    }

    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject: GameObject) {
        this.gameObjects = this.gameObjects.filter(obj => obj !== gameObject);
    }

    getGameObjectById(id: string): GameObject | undefined {
        return this.gameObjects.find(obj => obj.id === id);
    }

    getGameObjectsByName(name: string): GameObject[] {
        return this.gameObjects.filter(obj => obj.name === name);
    }

    update(deltaTime: number) {
        if (!this.isActive) return;
        for (const gameObject of this.gameObjects) {
            if (gameObject.active) {
                gameObject.update();
            }
        }
    }

    clear() {
        this.gameObjects = [];
    }

    destroy() {
        this.clear();
    }
}

export default Scene;