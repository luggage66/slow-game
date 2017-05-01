import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only

import MiniMap from './miniMap';
import ViewPort from './viewPort';
import EditorToolbar from './editorToolbar';
import styles from '../styles/index.scss';

@inject('gameState')
@observer
export default class GameView extends React.Component<{ gameState?: GameState }, never> {
    render() {
        const { gameState } = this.props;

        if (!gameState.isReady) {
            return <div>Loading...</div>;
        }

        return <div className={styles.gameView}>
            <ViewPort />
            <MiniMap />
            <EditorToolbar />
        </div>;
    }
}
