import * as React from 'react';
import { observable, action, runInAction, computed } from 'mobx';

import mapUrl from './map.png';
import { loadMapFromUrl, MapData } from './mapData';

export default class GameState {
    @observable isReady = false;
    @observable mapData: MapData;
    @observable mapUrl = mapUrl;

    constructor() {
        this.loadAssets();
    }

    @action
    async loadAssets() {
        const mapData = await loadMapFromUrl(this.mapUrl);

        runInAction(() => {
            console.log(mapData.imageData);
            this.mapData = mapData;
            this.isReady = true;
        });

    }

}
