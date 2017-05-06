import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only
import { RenderOptions } from '../stores/renderOptions'; // for type

import styles from '../styles/index.scss';

interface GameDevToolsProperties {
    gameState?: GameState;
    renderOptions?: RenderOptions;
}

@inject("gameState", "renderOptions")
@observer
export default class GameDevTools extends React.Component<GameDevToolsProperties, never> {

    render() {
        return <div className={styles.gameDevTools}>
            <label>
                <input
                    type="checkbox"
                    checked={this.props.renderOptions.highlightChunks}
                    onChange={(e) => this.props.renderOptions.highlightChunks = e.target.checked}
                /> Show Chunks
            </label>
        </div>;
    }
}
