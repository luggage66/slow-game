import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only

import MiniMap from './miniMap';
import ViewPort from './viewPort';
import GameDevTools from './gameDevTools';
import EditorToolbar from './editorToolbar';
import styles from '../styles/index.scss';

// tslint:disable-next-line:variable-name
let DevTools;
if (process.env.NODE_ENV === 'development') {
    DevTools = require('mobx-react-devtools').default; // tslint:disable-line:no-var-requires
}

@inject('gameState')
@observer
export default class GameView extends React.Component<{ gameState?: GameState }, never> {
    render() {
        const { gameState } = this.props;

        if (!gameState.isReady) {
            return <div>Loading...</div>;
        }

        return <div className={styles.gameView}>
            <DevTools />
            <ViewPort />
            <GameDevTools />
            <MiniMap />
            <EditorToolbar />
        </div>;
    }
}
