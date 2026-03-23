class Prefab {
    constructor(name, properties) {
        this.name = name;
        this.properties = properties;
    }

    createInstance() {
        const instance = { ...this.properties };
        instance.name = this.name;
        return instance;
    }
}

class PrefabManager {
    constructor() {
        this.prefabs = {};
    }

    addPrefab(prefab) {
        this.prefabs[prefab.name] = prefab;
    }

    getPrefab(name) {
        return this.prefabs[name];
    }

    createInstance(name) {
        const prefab = this.getPrefab(name);
        if (prefab) {
            return prefab.createInstance();
        }
        throw new Error(`Prefab '${name}' not found.`);
    }
}