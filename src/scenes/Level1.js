class Level1 extends Phaser.Scene{
    constructor(){
        super('level1Scene')
    }

    create(){
        //add tilemap
        const map = this.add.tilemap('level1JSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        const bgLayer = map.createLayer('Background', tileset, 0,0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

        //add player obj

        //add enemy objs

        //enemy group

        //init collision handling
        
        //Define input
        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        keySPACE = keyboardInput.addKey(keycode.SPACE)
        keyJ = keyboardInput.addKey(keycode.J)
        keyRESET = keyboardInput.addKey(keycode.R)
        keyTAB = keyboardInput.addKey(keycode.TAB)

        //gameover flag
        this.gameover = false
    }

    update(){
        
        if(!this.gameover){

        }
        else{

        }
    }

    //Collision handlers HERE
}