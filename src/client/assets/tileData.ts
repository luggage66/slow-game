interface IImageLoadData {
    key: string;
    pngName: string;
    color: string;
}

const imageLoadData: IImageLoadData[] = [
    {
        key: 'water',
        pngName: 'Water Block',
        color: 'blue'
    },
    {
        key: 'dirt',
        pngName: 'Dirt Block',
        color: 'brown'
    },
    {
        key: 'grass',
        pngName: 'Grass Block',
        color: 'green'
    },
    {
        key: 'stone',
        pngName: 'Stone Block',
        color: 'white'
    },
    {
        key: 'wall/tall',
        pngName: 'Wall Block Tall',
        color: 'grey'
    }
];

export interface TileInfo {
    key: string;
    image: HTMLImageElement;
    color: string;
}

export interface TileDictionary {
    [name: string]: TileInfo;
}

export async function loadTileImages(): Promise<TileDictionary> {

    const imageInfos = await Promise.all(imageLoadData.map(async tileLoadData => {

        const image = await loadTileImage(tileLoadData.pngName);

        return {
            key: tileLoadData.key,
            image,
            color: tileLoadData.color
        };
    }));

    return imageInfos.reduce((prev, next) => { prev[next.key] = next; return prev; }, {});
}

export function loadTileImage(pngName: string): Promise<HTMLImageElement> {
    const imageUrl = require(`./tiles/${pngName}.png`);
    const image = new Image();

    return new Promise<HTMLImageElement>((resolve, reject) => {
        image.onload = () => {
            resolve(image);
        };

        image.src = imageUrl;
    });
}
