import * as React from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { RenderOptions } from '../stores/renderOptions'; // for type

import styles from '../styles/index.scss';

const tileSize = { width: 50, height: 40 };

const horizontalTiles = 16;
const verticalTiles = 16;

const topPadding = 25;

interface MapChunkProperties {
    gameState?: GameState;
    renderOptions?: RenderOptions;
    x: number;
    y: number;
    style: React.CSSProperties;
}

@inject("gameState", "renderOptions")
@observer
export default class MapChunk extends React.Component<MapChunkProperties, never> {

    static width = tileSize.width * horizontalTiles;
    static height = tileSize.height * verticalTiles;

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;

    renderReactionDisposer: () => void;

    initializeCanvas = (canvasElement: HTMLCanvasElement) => {
        if (canvasElement) {
            this.canvasContext = canvasElement.getContext('2d');

            this.renderReactionDisposer = autorun(`Render chunk: ${this.props.x}-${this.props.y}`, () => this.renderToCanvas());
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
        const label = `Chunk - ${this.props.x}-${this.props.y}`;

        const ctx = this.canvasContext;

        const tileImage = this.props.gameState.tiles.grass.image;

        ctx.fillStyle = "white";
        // ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let x = 0; x < horizontalTiles; x++) {
            for (let y = 0; y < verticalTiles; y++) {
                const xPosition = x * tileSize.width;
                const yPosition = y * tileSize.height;

                ctx.drawImage(tileImage, xPosition, yPosition, 50.5, 85.5);
            }
        }

        if (this.props.renderOptions.highlightChunks) {
            ctx.save();
            ctx.translate(0, 25);

            ctx.font = '16px sans-serif';
            ctx.fillText(`Chunk - ${this.props.x}-${this.props.y}`, 10, 25);

            ctx.strokeRect(0, 0, MapChunk.width, MapChunk.height);

            ctx.restore();
        }
    }

    render() {
        const { style, gameState: { mapData }, x, y } = this.props;

        const canvasStyle = {
            marginTop: `-${topPadding}px`
        };

        return <div style={style}>
            <canvas
                style={canvasStyle}
                ref={this.initializeCanvas}
                width={MapChunk.width}
                height={MapChunk.height + topPadding}
                className={styles.mapChunk}
            />
        </div>;
    }
}
