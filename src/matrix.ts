export class Matrix<T> {

    private matrix: (T | undefined)[];

    constructor(private WIDTH: number, private HEIGHT: number) {
        this.matrix = [];
        for (let i = 0 ; i < WIDTH * HEIGHT ; i++) {
            this.matrix.push(undefined);
        }
    }

    public clear() {
        for (let i = 0 ; i < this.WIDTH * this.HEIGHT ; i++) {
            this.matrix[i] = undefined;
        }
    }

    public set(x: number, y: number, value: T) {
        if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) {
            throw new Error(`Illegal set at ${x},${y} while size = ${this.WIDTH}x${this.HEIGHT}`);
        }
        this.matrix[x + y * this.WIDTH] = value;
    }

    public get(x: number, y: number): T | undefined {
        if (x < 0 || x >= this.WIDTH || y < 0 || y >= this.HEIGHT) {
            return undefined;
        }
        return this.matrix[x + y * this.WIDTH];
    }

    public copyFrom(other: Matrix<T> ) {
        this.WIDTH = other.WIDTH;
        this.HEIGHT = other.HEIGHT;
        for (let i = 0 ; i < this.WIDTH * this.HEIGHT ; i++) {
            this.matrix[i] = other.matrix[i];
        }
    }

}
