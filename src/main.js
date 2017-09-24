import 'pixi';
import 'p2';
import Phaser from 'phaser';

import MainGame from './states/MainGame';
import TitleScreen from './states/TitleScreen';
import GameOver from './states/GameOver';

import config from './config';

class Game extends Phaser.Game {

    constructor () {
        const docElement = document.documentElement;
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

        super(width, height, Phaser.AUTO, 'content', null);

        this.state.add('TitleScreen', TitleScreen, false);
        this.state.add('MainGame', MainGame, false);
        this.state.add('GameOver', GameOver, false);

        this.state.start('TitleScreen');
    }

}

window.game = new Game();
