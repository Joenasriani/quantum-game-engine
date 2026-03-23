// StateManager.ts

interface State {
    enter(): void;
    update(deltaTime: number): void;
    exit(): void;
}

class StateManager {
    private currentState: State | null = null;

    public changeState(newState: State) {
        if (this.currentState) {
            this.currentState.exit();
        }
        this.currentState = newState;
        this.currentState.enter();
    }

    public update(deltaTime: number) {
        if (this.currentState) {
            this.currentState.update(deltaTime);
        }
    }
}

// Example states
class MenuState implements State {
    enter() {
        console.log('Entering Menu State');
    }
    update(deltaTime: number) {
        console.log('Updating Menu State', deltaTime);
    }
    exit() {
        console.log('Exiting Menu State');
    }
}

class PlayState implements State {
    enter() {
        console.log('Entering Play State');
    }
    update(deltaTime: number) {
        console.log('Updating Play State', deltaTime);
    }
    exit() {
        console.log('Exiting Play State');
    }
}

// Usage
const stateManager = new StateManager();
stateManager.changeState(new MenuState());

// Later in the game loop
const deltaTime = 16.67; // Example deltaTime
stateManager.update(deltaTime);
stateManager.changeState(new PlayState());