import * as React from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { MapStore } from '../stores/map'; // for type only

import styles from '../styles/index.scss';

interface MiniMapViewProps {
    gameState?: GameState;
    map?: MapStore;
}

@inject("gameState", "map")
@observer
export default class MiniMapView extends React.Component<MiniMapViewProps, never> {
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    renderCount: number = 0;

    renderReactionDisposer: () => void;

    initializeCanvas = (canvasElement: HTMLCanvasElement) => {
        if (canvasElement) {
            this.canvasContext = canvasElement.getContext('2d');

            this.renderReactionDisposer = autorun(`Render Minimap`, () => this.renderToCanvas());
        }
        else {
            if (this.renderReactionDisposer) {
                this.renderReactionDisposer();
            }
        }
    }

    componentWillUnmount() {
        if (this.renderReactionDisposer) {
            this.renderReactionDisposer();
        }
    }

    renderToCanvas() {
        this.renderCount++;
        const ctx = this.canvasContext;
        const map = this.props.map;

        ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);

        const rowsCount = map.ground.length;
        const columnsCount = map.ground[0].length;

        for (let y = 0; y < rowsCount; y++) {
            const row = map.ground[y];
            for (let x = 0; x < columnsCount; x++) {
                const cell = row[x];
                ctx.fillStyle = cell.color;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        ctx.fillText(`Minimap: ${this.renderCount} renders`, 10, 10);
    }

    render() {
        return <canvas
            ref={this.initializeCanvas}
            width={256}
            height={256}
            className={styles.miniMap}
        />;
    }
}
