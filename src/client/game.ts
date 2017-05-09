import * as React from 'react';
import { observable, action, runInAction, computed } from 'mobx';
import { MapStore } from './stores/map';
import { AssetsStore } from './stores/assets';
import { DisplayOptions } from './stores/displayOptions';

import mapUrl from './map.png';

export default class Game {
    @observable isReady = false;
    @observable mapUrl = mapUrl;

    map: MapStore;
    displayOptions: DisplayOptions;
    assets: AssetsStore;

    constructor() {
        this.assets = new AssetsStore();
        this.map = new MapStore(this.assets);
        this.displayOptions = new DisplayOptions();
    }

    @action
    async initialize() {
        await this.loadAssets();

        console.log('2');
        // this.gameloop();
    }

    @action
    async loadAssets() {
        await this.assets.load();
        this.map.generate('33223323');

        runInAction(() => {
            this.isReady = true;
        });
    }

    @action
    gameloop = () => {
        console.log('loopy');

        window.requestAnimationFrame(this.gameloop);
    }
}
