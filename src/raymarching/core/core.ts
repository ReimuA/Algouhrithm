import { Vector3 } from 'math3d';
import { exportBufferToPng } from './export';

export type Color = {
    r: number;
    g: number;
    b: number;
    a: number;
};

export type ViewPort = {
    eye: Vector3;
    pos: Vector3;
    width: number;
    heigth: number;
};

export interface RaymarchObject {
    sdf(otherPos: Vector3): number;
    normal(otherPos: Vector3): Vector3;
}

export async function raymarch(objects: RaymarchObject[]) {
    const viewPort = {
        width: 540,
        height: 540,
        pos: new Vector3(0),
        eye: new Vector3(0, 0, -100)
    };

    const minDistance = 0.01;
    const maxDepth = 1000;
    const maxStep = 1000;
    const buffer: Color[] = [];

    const light = new Vector3(10, 0, 50);

    for (let y = -Math.floor(viewPort.height / 2); y < viewPort.height / 2; y++) {
        for (let x = -Math.floor(viewPort.width / 2); x < viewPort.width / 2; x++) {
            const ray = new Vector3(x - viewPort.eye.x, y - viewPort.eye.y, viewPort.pos.y - viewPort.eye.z);
            const rayDirection = ray.normalize();

            let step = 0;
            let depth = 0;

            while (step < maxStep && depth < maxDepth) {
                const rayPos = rayDirection.mulScalar(depth);
                const dist = objects[0].sdf(rayPos);

                if (dist <= minDistance) {
                    const normal = objects[0].normal(rayPos).normalize();

                    buffer.push({
                        r: Math.abs(normal.x * 255),
                        g: Math.abs(normal.y * 255),
                        b: Math.abs(normal.z * 255),
                        a: 255
                    });
                    break;
                }
                depth += dist;
                step++;
            }

            if (depth >= maxDepth || step >= maxStep) buffer.push({ r: 0, g: 0, b: 0, a: 255 });
        }
    }
    await exportBufferToPng(viewPort.width, viewPort.height, buffer);
}
