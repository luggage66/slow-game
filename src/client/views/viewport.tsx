import * as React from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { AutoSizer, Grid, GridCellRenderer, GridCellProps } from 'react-virtualized';

import styles from '../styles/index.scss';

function getIndexForCoords(width, height, x, y) {
    return width * y * 4 + x * 4;

}

@inject("gameState")
@observer
export default class ViewPort extends React.Component<{ gameState?: GameState }, never> {

    @computed
    get tileSize() {
        return 50;
    }

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

        // console.log(index, r, g, b, a);
        // props.columnIndex * 4 *  props.rowIndex * 4

        return <div style={{...props.style, backgroundColor: `rgb(${r},${g},${b})` }} className={styles.tile} key={`${props.rowIndex}-${props.columnIndex}`}>
            X
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
                        columnWidth={this.tileSize}
                        columnCount={this.props.gameState.mapData.imageData.width}
                        height={height}
                        overscanColumnCount={20}
                        overscanRowCount={20}
                        rowHeight={this.tileSize}
                        rowCount={this.props.gameState.mapData.imageData.height}
                        width={width}
                    />;
                }}
            </AutoSizer>
        </div>;
    }
}


