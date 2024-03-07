/** Cake Quest by Jackson McLane
 *  Based off the game shown in Regular Show S7 EP6
 *  
 */

let config  = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 2600},
            debug: true
        },
    },
    scene: [Load, Title, Play, Credits]
}

let game = new Phaser.Game(config);
//reserved keyboard bindings
let keySPACE, keyJ, keyRESET, keyTAB
let musicPlaying = false
