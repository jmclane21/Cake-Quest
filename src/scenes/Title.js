class Title extends Phaser.Scene{
    constructor(){
        super("titleScene")
    }

    create(){
        // let backgroundMusic = this.sound.add('background_music')
        // backgroundMusic.loop = true
        // if(!musicPlaying){
        //     backgroundMusic.play()
        //     musicPlaying = true
        // }

        this.cameras.main.setBackgroundColor(0x012700)

        //display text
        this.add.bitmapText(game.config.width/5, game.config.height/5, 'pixel_font', 'CAKE\n      Quest').postFX.addGlow('0x2ef699', 2, 0)

        this.add.bitmapText(game.config.width*4/5, game.config.height*3/5, 'pixel_font', 'PRESS\n SPACE', 14).postFX.addGlow('0x2ef699', 1.5, 0)

        this.creditText = this.add.bitmapText(game.config.width*3.3/5, game.config.height*4/5, 'pixel_font', 'press ENTER for Credits', 12).postFX.addGlow('0x2ef699', 1.5, 0)


        this.add.sprite(180, game.config.height-90, 'mordekai_idle').setScale(5)
        this.add.sprite(360, game.config.height-70, 'rigby_idle').setScale(3)

        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        keySPACE = keyboardInput.addKey(keycode.SPACE)
        keyENTER = keyboardInput.addKey(keycode.ENTER)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            //this.sound.play('menu_select')
            this.scene.start('characterScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            //this.sound.play('menu_select')
            this.scene.start('creditsScene')
        }
    }
}