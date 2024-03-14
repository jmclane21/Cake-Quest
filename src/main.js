/** Cake Quest by Jackson McLane
 *  Based off the game shown in Regular Show S7 EP6
 *  
 */

'use strict'

let config  = {
    parent: 'gameView',
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: true
        },
    },
    scale: {
        //mode: Phaser.Scale.NONE,
        mode: Phaser.Scale.FIT,
        //mode: Phaser.Scale.ENVELOP,
        //mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        //mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        //mode: Phaser.Scale.EXPAND,
        //mode: Phaser.Scale.RESIZE,
        //autoCenter: Phaser.Scale.NO_CENTER,
        //autoCenter: Phaser.Scale.HORIZONTALLY,
        //autoCenter: Phaser.Scale.VERTICALLY,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Title, Character, Level1, Credits]
}

let game = new Phaser.Game(config);
//reserved keyboard bindings
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER
let musicPlaying = false
