/* globals document, window, process */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import GameView from './views/game';
import Game from './game';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import styles from './styles/index.scss';

if (process.env.NODE_ENV === 'development') {
    // useStrict(true);
}

// make a root element to mount the app into
const reactContainer = document.createElement('div');
reactContainer.id = 'react-root-container';
reactContainer.classList.add(styles.gameContainer);
document.body.appendChild(reactContainer);

// mounty mounty
const game = (window as any).game = new Game();
game.initialize();

// tslint:disable-next-line:variable-name
function render(Component) {
    ReactDom.render(<Provider game={game}><Component /></Provider>, reactContainer);
}

render(GameView);

if (module.hot) {
    module.hot.accept('./views/game', () => {
        console.log('hot reloading ./views/game');
        render(GameView);
    });
}
