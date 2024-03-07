class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    create(){
        //make background

        //add floor

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