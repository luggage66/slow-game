import { loadTileImages, TileInfo, TileDictionary, loadTileImage } from '../assets/tileData';

export class AssetsStore {
    tileTypes: TileDictionary;
    playerImage: HTMLImageElement;

    async load() {
        this.tileTypes = await loadTileImages();
        this.playerImage = await loadTileImage('Character Boy');
    }
}
