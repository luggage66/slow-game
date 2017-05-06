import * as React from 'react';
import { observable, action, runInAction, computed } from 'mobx';

import mapUrl from './map.png';
import { loadMapFromUrl, MapData } from './mapData';
import { TileDictionary, loadTileImages } from './tileData';

export default class GameState {
    @observable isReady = false;
    @observable mapData: MapData;
    @observable mapUrl = mapUrl;
    tiles: TileDictionary;

    constructor() {
        this.loadAssets();
    }

    @action
    async loadAssets() {
        const mapData = await loadMapFromUrl(this.mapUrl);
        const tiles = await loadTileImages();

        runInAction(() => {
            console.log(mapData.imageData);
            this.tiles = tiles;
            this.mapData = mapData;
            this.isReady = true;
        });

    }

}
