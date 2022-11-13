import { Vector3 } from 'math3d';
import { raymarch, RaymarchObject } from './core/core';

class Sphere implements RaymarchObject {
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
    const sphere = new Sphere(new Vector3(0, 0, 100), 70);

    console.log(`Rendering sphere at ${sphere.pos} with size ${sphere.size}}`);

    raymarch([sphere]);
    console.log('check output.png');
};

export default demo;
