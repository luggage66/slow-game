import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only

import styles from '../styles/index.scss';

@inject("gameState")
@observer
export default class MiniMapView extends React.Component<{ gameState?: GameState }, never> {

    // componentDidMount() {
    //     window.addEventListener
    // }

    render() {
        return <div className={styles.miniMap} style={{backgroundImage: `url(${this.props.gameState.mapUrl})`}}>
        </div>;
    }
}
