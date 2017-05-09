import * as React from 'react';
import { autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import Game from '../game'; // for type only
import { MapStore } from '../stores/map'; // for type
import Entity from './entity';

import styles from '../styles/index.scss';

const tileSize = {
    width: 50,
    height: 40
};

const horizontalTiles = 16;
const verticalTiles = 16;

const topPadding = 25;

interface EntityLayerProps {
    game?: Game;
}

@inject("game")
@observer
export default class EntityLayer extends React.Component<EntityLayerProps, never> {

    render() {
        return <div className={styles.entityLayer}>
            <Entity />
        </div>;
    }
}
