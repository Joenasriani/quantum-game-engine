interface TweenOptions {
    duration: number;
    easing?: (t: number) => number;
    onComplete?: () => void;
    onUpdate?: (value: number) => void;
}

class Tween {
    private startValue: number;
    private endValue: number;
    private duration: number;
    private elapsedTime: number = 0;
    private easing: (t: number) => number;
    private onComplete?: () => void;
    private onUpdate?: (value: number) => void;
    private isPlaying: boolean = false;

    constructor(startValue: number, endValue: number, options: TweenOptions) {
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = options.duration;
        this.easing = options.easing || Easing.linear;
        this.onComplete = options.onComplete;
        this.onUpdate = options.onUpdate;
    }

    public start(): void {
        this.isPlaying = true;
        this.elapsedTime = 0;
    }

    public stop(): void {
        this.isPlaying = false;
    }

    public update(deltaTime: number): void {
        if (!this.isPlaying) return;

        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.duration) {
            this.elapsedTime = this.duration;
            this.isPlaying = false;

            if (this.onUpdate) {
                this.onUpdate(this.endValue);
            }

            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            const progress = this.elapsedTime / this.duration;
            const easedProgress = this.easing(progress);
            const currentValue = this.startValue + (this.endValue - this.startValue) * easedProgress;

            if (this.onUpdate) {
                this.onUpdate(currentValue);
            }
        }
    }

    public isFinished(): boolean {
        return !this.isPlaying && this.elapsedTime >= this.duration;
    }
}

class Easing {
    public static linear(t: number): number {
        return t;
    }

    public static easeInQuad(t: number): number {
        return t * t;
    }

    public static easeOutQuad(t: number): number {
        return t * (2 - t);
    }

    public static easeInOutQuad(t: number): number {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    public static easeInCubic(t: number): number {
        return t * t * t;
    }

    public static easeOutCubic(t: number): number {
        return (--t) * t * t + 1;
    }

    public static easeInOutCubic(t: number): number {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 2)) * (2 * (t - 2)) + 1;
    }

    public static easeInSine(t: number): number {
        return -Math.cos(t * Math.PI) / 2 + 0.5;
    }

    public static easeOutSine(t: number): number {
        return Math.sin(t * Math.PI) / 2;
    }

    public static easeInOutSine(t: number): number {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    }
}

class TweenManager {
    private tweens: Tween[] = [];

    public create(startValue: number, endValue: number, options: TweenOptions): Tween {
        const tween = new Tween(startValue, endValue, options);
        this.tweens.push(tween);
        tween.start();
        return tween;
    }

    public update(deltaTime: number): void {
        for (let i = this.tweens.length - 1; i >= 0; i--) {
            this.tweens[i].update(deltaTime);

            if (this.tweens[i].isFinished()) {
                this.tweens.splice(i, 1);
            }
        }
    }

    public clear(): void {
        this.tweens = [];
    }

    public getTweenCount(): number {
        return this.tweens.length;
    }
}

export { Tween, TweenManager, Easing };