import Phaser from 'phaser'

import config from '../config';

let score;
let highScore;

export default class extends Phaser.State {

    init(_score){
        score = _score;
        if(localStorage.getItem(config.localStorageName) === null){
            highScore = 0;
        }else{
            highScore = localStorage.getItem(config.localStorageName)
        }
    }

    preload(){

    }

    create(){
        highScore = Math.max(score, highScore);
        localStorage.setItem(config.localStorageName, highScore);
        let style = {
            font: "48px Monospace",
            fill: "#00FF00",
            align: "center"
        };

        let width = this.stage.width / 2;
        let height = this.stage.height / 2;
        let scoreText = "Game Over\n\nYour score: "+ score+ "\n\nBest score: " + highScore + "\n\nTap to restart";
        let text = this.add.text(width, height, scoreText, style);
        text.anchor.set(0.5);

        this.input.onDown.add(this.restartGame, this);
    }

    restartGame(){
        let clearWorld = true;
        let clearCache = true;
        this.state.start("TitleScreen", clearWorld, clearCache);
    }

}