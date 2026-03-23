interface TileData {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    properties?: any;
}

interface TilemapLayer {
    name: string;
    tiles: number[][];
    opacity: number;
    visible: boolean;
}

class Tilemap {
    private width: number;
    private height: number;
    private tileWidth: number;
    private tileHeight: number;
    private layers: Map<string, TilemapLayer> = new Map();
    private tilesets: Map<number, any> = new Map();
    private collisionLayer: number[][] = [];

    constructor(width: number, height: number, tileWidth: number, tileHeight: number) {
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    public addLayer(name: string, tileData: number[][]): void {
        const layer: TilemapLayer = {
            name,
            tiles: tileData,
            opacity: 1,
            visible: true,
        };
        this.layers.set(name, layer);
    }

    public getLayer(name: string): TilemapLayer | undefined {
        return this.layers.get(name);
    }

    public setCollisionLayer(tileData: number[][]): void {
        this.collisionLayer = tileData;
    }

    public getCollisionTile(x: number, y: number): number {
        const gridX = Math.floor(x / this.tileWidth);
        const gridY = Math.floor(y / this.tileHeight);

        if (gridY < 0 || gridY >= this.collisionLayer.length) return 0;
        if (gridX < 0 || gridX >= this.collisionLayer[gridY].length) return 0;

        return this.collisionLayer[gridY][gridX];
    }

    public isTileColliding(x: number, y: number): boolean {
        return this.getCollisionTile(x, y) > 0;
    }

    public getTileWidth(): number {
        return this.tileWidth;
    }

    public getTileHeight(): number {
        return this.tileHeight;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getLayers(): TilemapLayer[] {
        return Array.from(this.layers.values());
    }

    public setLayerOpacity(name: string, opacity: number): void {
        const layer = this.layers.get(name);
        if (layer) {
            layer.opacity = Math.max(0, Math.min(1, opacity));
        }
    }

    public setLayerVisibility(name: string, visible: boolean): void {
        const layer = this.layers.get(name);
        if (layer) {
            layer.visible = visible;
        }
    }

    public render(context: CanvasRenderingContext2D, tilesetImage: HTMLImageElement, offsetX: number = 0, offsetY: number = 0): void {
        for (const layer of this.layers.values()) {
            if (!layer.visible) continue;

            context.globalAlpha = layer.opacity;

            for (let y = 0; y < layer.tiles.length; y++) {
                for (let x = 0; x < layer.tiles[y].length; x++) {
                    const tileId = layer.tiles[y][x];

                    if (tileId === 0) continue;

                    const screenX = x * this.tileWidth + offsetX;
                    const screenY = y * this.tileHeight + offsetY;

                    const srcX = (tileId - 1) * this.tileWidth;
                    const srcY = 0;

                    context.drawImage(
                        tilesetImage,
                        srcX,
                        srcY,
                        this.tileWidth,
                        this.tileHeight,
                        screenX,
                        screenY,
                        this.tileWidth,
                        this.tileHeight
                    );
                }
            }
        }

        context.globalAlpha = 1;
    }
}

class TilemapManager {
    private tilemaps: Map<string, Tilemap> = new Map();

    public createTilemap(name: string, width: number, height: number, tileWidth: number, tileHeight: number): Tilemap {
        const tilemap = new Tilemap(width, height, tileWidth, tileHeight);
        this.tilemaps.set(name, tilemap);
        return tilemap;
    }

    public getTilemap(name: string): Tilemap | undefined {
        return this.tilemaps.get(name);
    }

    public removeTilemap(name: string): void {
        this.tilemaps.delete(name);
    }

    public loadTilemapFromJSON(name: string, jsonData: any): Tilemap {
        const tilemap = new Tilemap(jsonData.width, jsonData.height, jsonData.tilewidth, jsonData.tileheight);

        for (const layer of jsonData.layers) {
            if (layer.type === 'tilelayer') {
                const tiles: number[][] = [];
                for (let i = 0; i < layer.data.length; i += jsonData.width) {
                    tiles.push(layer.data.slice(i, i + jsonData.width));
                }
                tilemap.addLayer(layer.name, tiles);

                if (layer.name === 'collision') {
                    tilemap.setCollisionLayer(tiles);
                }
            }
        }

        this.tilemaps.set(name, tilemap);
        return tilemap;
    }
}

export { Tilemap, TilemapManager, TilemapLayer, TileData };