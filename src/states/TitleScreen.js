import Phaser from 'phaser'

let playSound;

export default class extends Phaser.State {

    init(){

    }
    preload(){
        this.load.spritesheet("soundicon", "assets/images/soundicon.png", 80, 80);
    }

    create(){
        this.stage.disableVisibilityChange = true;
        let style = {
            font: "48px Monospace",
            fill: "#00ff00",
            align: "center"
        };
        let text = this.add.text(this.stage.width / 2, this.stage.height / 2 - 100, "Crack Alien Code", style);
        text.anchor.set(0.5);
        let soundButton = this.add.button(this.stage.width / 2 - 100, this.stage.height / 2 + 100, "soundicon", this.startGame, this);
        soundButton.anchor.set(0.5);
        soundButton = this.add.button(this.stage.width / 2 + 100, this.stage.height / 2 + 100, "soundicon", this.startGame, this);
        soundButton.frame = 1;
        soundButton.anchor.set(0.5);
    }

    startGame(target){
        let clearWorld = true;
        let clearCache = false;

        if(target.frame === 0){
            playSound = true;
        }else{
            playSound = false;
        }
        this.state.start("MainGame", clearWorld, clearCache, playSound);
    }

}