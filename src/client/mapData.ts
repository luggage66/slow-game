import { observable } from 'mobx';

export function loadMapFromUrl(url: string) {
    const img = new Image();

    return new Promise<MapData>((resolve, reject) => {
        const canvas = document.createElement('canvas');

        img.onload = () => {
            const { width, height } = img;
            Object.assign(canvas, { width, height });
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 1, 1, width, height);
            const imageData = ctx.getImageData(1, 1, width, height);

            resolve(new MapData(imageData));
        };

        img.src = url;
    });
}

export class MapData {
    imageData: ImageData;

    @observable tiles: ITileData[][];

    constructor(imageData: ImageData) {
        this.imageData = imageData;

        const tiles: ITileData[][] = [];

        for (let i = 0; i < 256; i++) {
            const row: ITileData[] = [];
            for (let j = 0; j < 256; j++) {
                row[j] = { ground: 'dirt', structure: null };
            }

            tiles[i] = row;
        }

        this.tiles = tiles;
    }
}

export interface ITileData {
    ground: 'dirt' | 'water' | 'grass' | 'stone';
    structure: null | 'wall' | 'tree';
}
