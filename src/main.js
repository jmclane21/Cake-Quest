/** Cake Quest by Jackson McLane
 *  Based off the game shown in Regular Show S7 EP6
 *  Phaser Components Used:
 *  Phyiscs
 *  Cameras
 *  Text Objects
 *  Timers
 *  Pipeline FX
 */

'use strict'

let config  = {
    parent: 'gameView',
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: true
        },
    },
    scale: {
        //mode: Phaser.Scale.NONE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.HORIZONTALLY,
    },
    scene: [Load, Title, Character, Lives, Level1, Level2, Credits, GameOver]
}

let game = new Phaser.Game(config);
//reserved keyboard bindings
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER
let musicPlaying = false
