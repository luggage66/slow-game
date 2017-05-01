import * as React from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { AutoSizer, Grid, GridCellRenderer, GridCellProps } from 'react-virtualized';

import dirtTileUrl from '../tiles/Dirt Block.png';
import waterTileUrl from '../tiles/Water Block.png';
import grassTileUrl from '../tiles/Grass Block.png';
import stoneTileUrl from '../tiles/Stone Block.png';

import styles from '../styles/index.scss';

const tiles = {
    dirt: dirtTileUrl,
    water: waterTileUrl,
    grass: grassTileUrl,
    stone: stoneTileUrl
};

function getIndexForCoords(width, height, x, y) {
    return width * y * 4 + x * 4;

}

function determineTile(red, green, blue) {
    if (blue > red && blue > green) {
        return 'water';
    }
    else if (green > red && green > blue) {
        return 'grass';
    }
    else if (getBrightness(red, green, blue) > 125) {
        return 'stone';
    }
    else {
        return 'dirt';
    }
}

function getBrightness(r, g, b) {
    return Math.sqrt(
        r * r * .241 +
        g * g * .691 +
        b * b * .068);
}


@inject("gameState")
@observer
export default class ViewPort extends React.Component<{ gameState?: GameState }, never> {

    cellRenderer = (props: GridCellProps) => {
        const index = getIndexForCoords(
            this.props.gameState.mapData.imageData.width,
            this.props.gameState.mapData.imageData.height,
            props.columnIndex,
            props.rowIndex
        );

        const rawData = this.props.gameState.mapData.imageData.data;

        const r = rawData[index];
        const g = rawData[index + 1];
        const b = rawData[index + 2];
        const a = rawData[index + 3];

        const tileName = determineTile(r, g, b);
        const tileUrl = tiles[tileName];

        const localStyle = {
            backgroundImage: `url(${tileUrl})`,
        };

        // console.log(index, r, g, b, a);
        // props.columnIndex * 4 *  props.rowIndex * 4

        return <div style={{...props.style, ...localStyle }} className={styles.tile} key={`${props.rowIndex}-${props.columnIndex}`}>
        </div>;
    }

    render() {
        // let { width, height } = this.props.gameState.mapData.imageData;
        // console.log({ width, height });

        return <div className={styles.viewport}>
            <AutoSizer>
                {({width, height}) => {
                    return <Grid
                        cellRenderer={this.cellRenderer}
                        columnWidth={50}
                        columnCount={this.props.gameState.mapData.imageData.width}
                        height={height}
                        overscanColumnCount={10}
                        overscanRowCount={10}
                        rowHeight={40}
                        rowCount={this.props.gameState.mapData.imageData.height}
                        width={width}
                    />;
                }}
            </AutoSizer>
        </div>;
    }
}
