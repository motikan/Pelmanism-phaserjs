import Phaser from 'phaser'

let score;

export default class extends Phaser.State {

    init(_score){
        score = _score;
    }
    preload(){

    }

    create(){
        let style = {
            font: "48px Monospace",
            fill: "#00FF00",
            align: "center"
        };

        let width = this.stage.width / 2;
        let height = this.stage.height / 2;
        let scoreText = "Game Over\n\nYour score: "+ score+ "\n\nBest score: " + score + "\n\nTap to restart";
        let text = this.add.text(width, height, scoreText, style);
        text.anchor.set(0.5);

        this.input.onDown.add(this.restartGame, this);
    }

    restartGame(){
        let clearWorld = true;
        let clearCache = false;
        this.state.start("TitleScreen", clearWorld, clearCache);
    }

}