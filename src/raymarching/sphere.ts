import { Vector3 } from 'math3d';
import { raymarch, RaymarchObject } from './core/core';

class Sphere implements RaymarchObject {
    constructor(pos: Vector3, size: number) {
        this.pos = pos;
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
        this.radius = size;
    }

    public pos: Vector3;
    public x: number;
    public y: number;
    public z: number;
    public radius: number;

    sdf(otherPos: Vector3): number {
        return this.pos.distanceTo(otherPos) - this.radius;
    }

    normal(pos: Vector3): Vector3 {
        return pos.sub(this.pos).normalize();
    }
}

const demo = () => {
    const sphere = new Sphere(new Vector3(0, 0, 800), 700);

    console.log(`Rendering sphere at ${sphere.pos} with size ${sphere.radius}}`);

    raymarch([sphere]);
    console.log('check output.png');
};

export default demo;
