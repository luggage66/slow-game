import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Game from '../game'; // for type only

import styles from '../styles/index.scss';

interface GameDevToolsProperties {
    game?: Game;
}

@inject("game")
@observer
export default class GameDevTools extends React.Component<GameDevToolsProperties, never> {

    render() {
        return <div className={styles.gameDevTools}>
            <label>
                <input
                    type="checkbox"
                    checked={this.props.game.displayOptions.highlightChunks}
                    onChange={(e) => this.props.game.displayOptions.highlightChunks = e.target.checked}
                /> Show Chunks
            </label>
        </div>;
    }
}
