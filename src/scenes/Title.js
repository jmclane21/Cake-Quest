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

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - 90, 'Samurai Run', 
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use Spacebar to jump & (J) to strike\nPress button to start\nTAB for Credits', menuConfig).
        setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'

        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        keySPACE = keyboardInput.addKey(keycode.SPACE)
        keyJ = keyboardInput.addKey(keycode.J)
        keyTAB = keyboardInput.addKey(keycode.TAB)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyJ) || Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play('menu_select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyTAB)){
            this.sound.play('menu_select')
            this.scene.start('creditsScene')
        }
    }
}