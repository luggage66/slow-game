import * as React from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { AutoSizer, Grid, GridCellRenderer, GridCellProps } from 'react-virtualized';

import MapChunk from './mapChunk';
import EntityLayer from './entityLayer';

import styles from '../styles/index.scss';

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
        return <MapChunk key={`${props.rowIndex}-${props.columnIndex}`} x={props.columnIndex} y={props.rowIndex} style={props.style} />;
    }

    render() {
        return <div className={styles.viewport}>
            <AutoSizer>
                {({width, height}) => {
                    return [
                        <Grid
                            cellRenderer={this.cellRenderer}
                            columnWidth={MapChunk.width}
                            columnCount={16}
                            height={height}
                            overscanColumnCount={1}
                            overscanRowCount={1}
                            rowHeight={MapChunk.height}
                            rowCount={16}
                            width={width}
                        />,
                        <EntityLayer />
                    ];
                }}
            </AutoSizer>
        </div>;
    }
}
