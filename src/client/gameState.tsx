import * as React from 'react';
import { observable, action, runInAction, computed } from 'mobx';
import { MapStore } from './stores/map';
import { AssetsStore } from './stores/assets';
import { RenderOptions } from './stores/renderOptions';

import mapUrl from './map.png';

export default class GameState {
    @observable isReady = false;
    @observable mapUrl = mapUrl;

    stores: {
        gameState: GameState;
        map: MapStore;
        renderOptions: RenderOptions;
        assets: AssetsStore;
    };

    constructor() {
        const assets = new AssetsStore();
        const map = new MapStore(assets);

        const renderOptions = new RenderOptions();
        this.stores = {
            gameState: this,
            map,
            renderOptions,
            assets
        };
    }

    @action
    async initilize() {
        await this.loadAssets();

        console.log('2');
        // this.gameloop();
    }

    @action
    async loadAssets() {
        await this.stores.assets.load();
        this.stores.map.generate('33223323');

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
