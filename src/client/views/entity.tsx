import * as React from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { RenderOptions } from '../stores/renderOptions'; // for type
import { MapStore } from '../stores/map'; // for type
import { AssetsStore } from '../stores/assets'; // for type

import styles from '../styles/index.scss';

const tileSize = {
    width: 50,
    height: 40
};

const horizontalTiles = 16;
const verticalTiles = 16;

const topPadding = 25;

interface EntityProps {
    gameState?: GameState;
    renderOptions?: RenderOptions;
    map?: MapStore;
    assets?: AssetsStore;
}

@inject("gameState", "renderOptions", "map", "assets")
@observer
export default class Entity extends React.Component<EntityProps, never> {

    static width = 50;
    static height = 85;

    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    renderCount: number = 0;

    renderReactionDisposer: () => void;

    initializeCanvas = (canvasElement: HTMLCanvasElement) => {
        if (canvasElement) {
            this.canvasContext = canvasElement.getContext('2d');

            this.renderReactionDisposer = autorun(`Render Entity #1`, () => this.renderToCanvas());
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
        const label = `Entity #1`;
        const highlightEntities = this.props.renderOptions.highlightEntities;
        const ctx = this.canvasContext;

        ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);

        const tileImage = this.props.assets.playerImage;
        ctx.drawImage(tileImage, 0, 0, Entity.width, Entity.height);


        if (highlightEntities) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0.5, topPadding + 0.5);

            ctx.rect(0, 0, Entity.width, Entity.height);
            ctx.clip();

            ctx.fillStyle = 'white';
            ctx.font = '14px sans-serif';
            ctx.fillText(`${this.renderCount} renders.`, 0, Entity.height);

            ctx.shadowColor = "purple";
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 4;
            ctx.strokeStyle = "purple";
            ctx.lineWidth = 2;

            ctx.strokeRect(0, 0, Entity.width - 1, Entity.height - 1);

            ctx.restore();
        }
    }

    render() {
        return <canvas
            ref={this.initializeCanvas}
            width={Entity.width}
            height={Entity.height}
            className={styles.entity}
        />;
    }
}
