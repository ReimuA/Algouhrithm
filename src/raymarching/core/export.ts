import Jimp from 'jimp';
import { Color } from './core';

function createImage(width: number, height: number): Promise<Jimp> {
    const promise = new Promise<Jimp>((resolve, reject) => {
        new Jimp(width, height, (err, image) => {
            if (err) reject(err);
            resolve(image);
        });
    });

    return promise;
}

async function exportBufferToPng(width: number, height: number, buffer: Color[]) {
    const img = await createImage(width, height);

    for (let i = 0; i < width * height; i++) {
        const pixelColor = Jimp.rgbaToInt(buffer[i].r, buffer[i].g, buffer[i].b, buffer[i].a);
        img.setPixelColor(pixelColor, i % width, i / width);
    }

    await img.writeAsync('./output.png');
}
