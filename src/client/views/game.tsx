import * as React from 'react';
import { observer, inject } from 'mobx-react';
import Game from '../game'; // for type only

import MiniMap from './miniMap';
import ViewPort from './viewPort';
import GameDevTools from './gameDevTools';
import styles from '../styles/index.scss';

// tslint:disable-next-line:variable-name
let DevTools;
if (process.env.NODE_ENV === 'development') {
    DevTools = require('mobx-react-devtools').default; // tslint:disable-line:no-var-requires
}

@inject('game')
@observer
export default class GameView extends React.Component<{ game?: Game }, never> {
    render() {
        const { game } = this.props;

        if (!game.isReady) {
            return <div>Loading...</div>;
        }

        return <div className={styles.gameView}>
            <DevTools />
            <ViewPort />
            <GameDevTools />
            <MiniMap />
        </div>;
    }
}
