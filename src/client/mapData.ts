
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

    constructor(imageData: ImageData) {
        this.imageData = imageData;
    }


}
