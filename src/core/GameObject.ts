class GameObject {
    id: string;
    name: string;
    active: boolean;
    transform: { 
        position: { x: number; y: number; z: number }; 
        rotation: { x: number; y: number; z: number }; 
        scale: { x: number; y: number; z: number }; 
    };
    children: GameObject[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.active = true;
        this.transform = { 
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
        };
        this.children = [];
    }

    addChild(child: GameObject) {
        this.children.push(child);
    }

    removeChild(child: GameObject) {
        this.children = this.children.filter(c => c !== child);
    }

    setPosition(x: number, y: number, z: number) {
        this.transform.position = { x, y, z };
    }

    setRotation(x: number, y: number, z: number) {
        this.transform.rotation = { x, y, z };
    }

    setScale(x: number, y: number, z: number) {
        this.transform.scale = { x, y, z };
    }

    update() {
        // Update logic here
    }

    destroy() {
        // Cleanup logic here
    }
}

export default GameObject;