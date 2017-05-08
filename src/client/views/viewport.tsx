import * as React from 'react';
import { computed, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { AutoSizer, Grid, GridCellRenderer, GridCellProps } from 'react-virtualized';

import MapChunk from './mapChunk';
import EntityLayer from './entityLayer';

import styles from '../styles/index.scss';


@inject("gameState")
@observer
export default class ViewPort extends React.Component<{ gameState?: GameState }, never> {

    cellRenderer = (props: GridCellProps) => {
        return <MapChunk key={`${props.rowIndex}-${props.columnIndex}`} x={props.columnIndex} y={props.rowIndex} style={props.style} />;
    }

    @action.bound
    handleExternalScroll(event: React.UIEvent<HTMLDivElement>) {
        // const x = event.currentTarget.scrollTop
    }

    render() {
        return <div className={styles.viewport} onScroll={this.handleExternalScroll}>
            <AutoSizer>
                {({width, height}) => {
                    return <Grid
                        cellRenderer={this.cellRenderer}
                        columnWidth={MapChunk.width}
                        columnCount={16}
                        height={height}
                        overscanColumnCount={1}
                        overscanRowCount={1}
                        rowHeight={MapChunk.height}
                        rowCount={16}
                        width={width}
                    />;
                }}
            </AutoSizer>
        </div>;
    }
}
