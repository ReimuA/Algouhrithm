import { Vector3 } from 'math3d';

class Sphere {
    constructor(pos: Vector3, size: number) {
        this.pos = pos;
        this.size = size;
    }

    public pos: Vector3;
    public size: number;

    sdf(otherPos: Vector3): number {
        return this.pos.distanceTo(otherPos) - this.size;
    }
}

const demo = () => {
    const sphere = new Sphere(new Vector3(10, 0, 0), 1);

    console.log(
        `Distance to sphere at ${sphere.pos} with size ${sphere.size} from 0: ${sphere.sdf(new Vector3(0, 0, 0))}`
    );
};

export default demo;
