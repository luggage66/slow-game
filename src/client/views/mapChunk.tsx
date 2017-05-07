import * as React from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { RenderOptions } from '../stores/renderOptions'; // for type
import { MapStore } from '../stores/map'; // for type

import styles from '../styles/index.scss';

const tileSize = {
    width: 50,
    height: 40
};

const horizontalTiles = 16;
const verticalTiles = 16;

const topPadding = 25;

interface MapChunkProperties {
    gameState?: GameState;
    renderOptions?: RenderOptions;
    map?: MapStore;
    x: number;
    y: number;
    style: React.CSSProperties;
}

@inject("gameState", "renderOptions", "map")
@observer
export default class MapChunk extends React.Component<MapChunkProperties, never> {

    static width = tileSize.width * horizontalTiles;
    static height = tileSize.height * verticalTiles;

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    renderCount: number = 0;

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
        this.renderCount++;

        const label = `Chunk - ${this.props.x}-${this.props.y}`;
        const highlightChunks = this.props.renderOptions.highlightChunks;
        const map = this.props.map;
        const ctx = this.canvasContext;

        ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);

        ctx.fillStyle = "white";
        // ctx.fillRect(0, 0, 10, 10); // this.canvas.width, this.canvas.height);

        for (let x = 0; x < horizontalTiles; x++) {
            for (let y = 0; y < verticalTiles; y++) {
                const xPosition = x * tileSize.width;
                const yPosition = y * tileSize.height;

                const mapX = x + this.props.x * horizontalTiles;
                const mapY = y + this.props.y * verticalTiles;

                const tileImage = map.ground[mapY][mapX].image;

                // const tileImage = this.props.gameState.tiles[(x + y) % 23 ? 'grass' : 'wall/tall'].image;

                ctx.drawImage(tileImage, xPosition, yPosition, 50, 85);
            }
        }

        if (highlightChunks) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0.5, topPadding + 0.5);

            ctx.rect(0, 0, MapChunk.width, MapChunk.height);
            ctx.clip();

            ctx.shadowColor = "black";
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 5;

            ctx.font = '16px sans-serif';
            ctx.fillStyle = 'white';
            ctx.fillText(`Chunk ${this.props.y}, ${this.props.x}`, 10, 25);

            ctx.font = '14px sans-serif';
            ctx.fillText(`${this.renderCount} renders.`, 10, 44);

            ctx.shadowColor = "purple";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 4;
            ctx.strokeStyle = "purple";
            ctx.lineWidth = 2;

            ctx.strokeRect(0, 0, MapChunk.width, MapChunk.height);

            ctx.restore();
        }
    }

    render() {
        const { style, x, y } = this.props;

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
