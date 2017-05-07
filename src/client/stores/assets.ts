import { loadTileImages, TileInfo, TileDictionary } from '../assets/tileData';

export class AssetsStore {
    tileTypes: TileDictionary;

    async load() {
        this.tileTypes = await loadTileImages();
    }
}
