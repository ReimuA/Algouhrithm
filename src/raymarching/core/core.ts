import { Vector3 } from 'math3d';
import { exportBufferToPng } from './export';

export type Color = {
    r: number;
    g: number;
    b: number;
    a: number;
};

export interface RaymarchObject {
    sdf(otherPos: Vector3): number;
}

export async function raymarch(objects: RaymarchObject[]) {
    const width = 512;
    const height = 512;
    const eye = new Vector3(0, 0, -100);
    const viewPort = { eye, pos: new Vector3(0), width, height };
    const minDistance = 0.001;
    const maxDepth = 1000;
    const maxStep = 1000;
    const buffer: Color[] = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const ray = new Vector3(
                Math.floor(x - viewPort.width / 2 - eye.x),
                Math.floor(y - viewPort.height / 2 - eye.y),
                viewPort.pos.y - eye.z
            );
            const rayDirection = ray.normalize();

            let depth = 0;
            let step = 0;

            while (step < maxStep && depth < maxDepth) {
                const rayPos = new Vector3(rayDirection.x * depth, rayDirection.y * depth, rayDirection.z * depth);
                const dist = objects[0].sdf(rayPos);

                if (ray.x == 0 && ray.y == 0) {
                    console.log('ouhouh');
                }

                if (dist <= minDistance) break;

                depth += dist;
                step++;
            }

            if (depth >= maxDepth || step >= maxStep) buffer.push({ r: 0, g: 0, b: 0, a: 255 });
            else buffer.push({ r: 255, g: 0, b: 0, a: 255 });
        }
    }
    await exportBufferToPng(width, height, buffer);
}
