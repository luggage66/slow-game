import { observable } from 'mobx';
import { loadTileImages, TileInfo, TileDictionary } from '../assets/tileData';
import * as seedrandom from 'seedrandom';
import FastSimplexNoise, {  } from 'fast-simplex-noise';
import { AssetsStore } from './assets';

const CHUNK_WIDTH = 16;
const CHUNK_HEIGHT = 16;
const TILES_PER_CHUNK_HORIZONTAL = 16;
const TILES_PER_CHUNK_VERTICAL = 16;
const MAP_WIDTH = CHUNK_WIDTH * TILES_PER_CHUNK_HORIZONTAL;
const MAP_HEIGHT = CHUNK_HEIGHT * TILES_PER_CHUNK_VERTICAL;

export class MapStore {
    @observable ground: TileInfo[][];
    assets: AssetsStore;

    constructor(assets: AssetsStore) {
        this.assets = assets;
    }

    generate(seed: string) {
        this.ground = generateMap(seed, this.assets.tileTypes);
    }
}

function generateMap(seed: string, tiles: TileDictionary): TileInfo[][] {
    const rng = seedrandom(seed);
    const noiseGen = new FastSimplexNoise({
        random: rng,
        max: 4,
        min: 0,
        frequency: 0.01,
        octaves: 8
    });

    const map = new Array(MAP_HEIGHT);

    const tileMap = [
        tiles.water,
        tiles.dirt,
        tiles.grass,
        tiles.stone
    ];

    for (let y = 0; y < MAP_HEIGHT; y++) {
        map[y] = new Array(MAP_WIDTH);
        for (let x = 0; x < MAP_WIDTH; x++) {

            if (x === 2 && y === 2) {
                map[y][x] = tiles.water;
            }
            else {
                map[y][x] = tiles.dirt;
            }

            const n = Math.floor(noiseGen.scaled2D(x, y));

            map[y][x] = tileMap[n];

        }
    }

    return map;
}
