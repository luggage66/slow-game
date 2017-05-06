import dirtTileUrl from './tiles/Dirt Block.png';
import waterTileUrl from './tiles/Water Block.png';
import grassTileUrl from './tiles/Grass Block.png';
import stoneTileUrl from './tiles/Stone Block.png';
import tallTileUrl from './tiles/Wall Block Tall.png';

const tileUrls = {
    dirt: dirtTileUrl,
    water: waterTileUrl,
    grass: grassTileUrl,
    stone: stoneTileUrl,
    tall: tallTileUrl
};

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
    console.log('loadTileImages()');
    const imageInfos = await Promise.all(imageLoadData.map(tileLoadData => {
        console.log(`./tiles/${tileLoadData.pngName}.png`);
        const imageUrl = require(`./tiles/${tileLoadData.pngName}.png`);
        const image = new Image();

        console.log('loadTileImages()', imageUrl);

        return new Promise<TileInfo>((resolve, reject) => {
            // const tileImageUrl = require;

            image.onload = () => {
                console.log('onload()');
                resolve({
                    key: tileLoadData.key,
                    image,
                    color: tileLoadData.color
                });
            };

            image.src = imageUrl;
        });
    }));

    return imageInfos.reduce((prev, next) => { prev[next.key] = next; return prev; }, {});
}
