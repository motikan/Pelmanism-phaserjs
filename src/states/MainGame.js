import Phaser from 'phaser';

let tileSize = 128;
let numRows = 4;
let numCols = 5;
let tileSpacing = 10;
let timeLeft;
let tilesArray = [];
let selectedArray = [];
let playSound;
let score;
let soundArray = [];
let scoreText;
let timeText;
let stopFlag = false;

export default class extends Phaser.State {

    init (_playSound) {
        playSound = _playSound;
        timeLeft = 20;
    }

    preload () {
        this.load.spritesheet("tails", "/assets/images/tiles.png", tileSize, tileSize);

        this.load.audio("select", "/assets/audios/select.mp3");
        this.load.audio("right", "/assets/audios/right.mp3");
        this.load.audio("wrong", "/assets/audios/wrong.mp3");
    }

    render () {

    }

    create () {
        if (playSound) {
            soundArray[0] = this.add.audio("select");
            soundArray[1] = this.add.audio("right");
            soundArray[2] = this.add.audio("wrong");
        }

        let leftSpace = (this.stage.width - (numCols * tileSize) - ((numCols - 1) * tileSpacing)) / 2;
        let topSpace = (this.stage.height - (numRows * tileSize) - ((numRows - 1) * tileSpacing)) / 2;

        for(let i = 0; i < numRows * numCols; i++){
            tilesArray.push(Math.floor(i / 2));
        }

        for(let i = 0; i < numRows * numCols; i++){
            let from = this.rnd.between(0, tilesArray.length - 1);
            let to = this.rnd.between(0, tilesArray.length - 1);
            let temp = tilesArray[from];
            tilesArray[from] = tilesArray[to];
            tilesArray[to] = temp;
        }

        for(let i = 0; i < numCols; i++){
            for(let j = 0; j < numRows; j++){
                let tile = this.add.button(leftSpace + i * (tileSize + tileSpacing),
                    topSpace + j * (tileSize + tileSpacing), "tails", this.showTile, this);
                tile.frame = 10;
                tile.value = tilesArray[j * numCols + i];
            }
        }

        score = 0;
        let style = {
            font: "32px Monospace",
            fill: "#00ff00",
            align: "center"
        };
        scoreText = this.add.text(5, 5, "Score: " + score, style);

        timeText = this.add.text(5, this.stage.height, "Time left: " + timeLeft, style);
        timeText.anchor.set(0, 1);
        this.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);
    }

    decreaseTime(){
        timeLeft--;
        timeText.text = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            let clearWorld = true;
            let clearCache = false;
            this.state.start("GameOver", clearWorld, clearCache, score);
        }
    }

    showTile(target){
        if(selectedArray.length < 2 && selectedArray.indexOf(target) === -1){
            if(playSound){
                soundArray[0].play();
            }
            target.frame = target.value;
            selectedArray.push(target);
        }

        // ２枚選択済み
        if(selectedArray.length === 2 && stopFlag === false){
            stopFlag = true;
            this.time.events.add(Phaser.Timer.SECOND, this.checkTiles, this);
        }
    }

    // 選択画像の検証
    checkTiles(){
        if(selectedArray[0].value === selectedArray[1].value){
            // 同じ画像を選択
            if(playSound){
                soundArray[1].play();
            }
            score++;
            scoreText.text = "Score: " + score;
            selectedArray[0].destroy();
            selectedArray[1].destroy();
        } else{
            if(playSound){
                soundArray[2].play();
            }
            selectedArray[0].frame = 10;
            selectedArray[1].frame = 10;
        }
        selectedArray.length = 0;
        stopFlag = false;
    }

}
