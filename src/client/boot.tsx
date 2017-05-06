/* globals document, window, process */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import GameView from './views/game';
import GameState from './gameState';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import styles from './styles/index.scss';
import { RenderOptions } from './stores/renderOptions';

if (process.env.NODE_ENV === 'development') {
    // useStrict(true);
}

// make a root element to mount the app into
const reactContainer = document.createElement('div');
reactContainer.id = 'react-root-container';
reactContainer.classList.add(styles.gameContainer);
document.body.appendChild(reactContainer);

// mounty mounty
const gameState = (window as any).game = new GameState();
const renderOptions = (window as any).renderOptions = new RenderOptions();
ReactDom.render(<Provider gameState={gameState} renderOptions={renderOptions}><GameView /></Provider>, reactContainer);
