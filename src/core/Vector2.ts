class Vector2 {
    // Properties
    x: number;
    y: number;

    // Constructor
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Add another vector
    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    // Subtract another vector
    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    // Dot product with another vector
    dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    // Magnitude (length) of the vector
    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Normalized vector
    normalize(): Vector2 {
        const mag = this.magnitude();
        return new Vector2(this.x / mag, this.y / mag);
    }
}

export default Vector2;