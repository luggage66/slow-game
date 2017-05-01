import * as React from 'react';
import { observer, inject } from 'mobx-react';
import GameState from '../gameState'; // for type only

import styles from '../styles/index.scss';

@inject("gameState")
@observer
export default class EditorToolbar extends React.Component<{ gameState?: GameState }, never> {

    render() {
        return <div className={styles.editorToolbar}>
        </div>;
    }
}
