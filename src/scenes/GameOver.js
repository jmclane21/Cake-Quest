class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOverScene')
    }

    create(){
        this.cameras.main.setBackgroundColor(0x012700)
        this.flavor_text;
        if(this.game.settings.lives > 0){
            this.flavor_text = 'WINER'
        }
        else{
            this.flavor_text = 'LOZER'
        }
        this.text = this.add.bitmapText(game.config.width/2, game.config.height/5, 'pixel_font', `your a\n\n${this.flavor_text}`, 
            60, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        this.text.postFX.addGlow('0x2ef699', 1.5, 0)
        this.text.setOrigin(.5,0)

        this.subtext = this.add.bitmapText(game.config.width/2, game.config.height/1.6, 'pixel_font', 'GAME OVER', 
        20, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        this.subtext.postFX.addGlow('0x2ef699', 1.5, 0)
        this.subtext.setOrigin(.5,0)

        this.controlText = this.add.bitmapText(game.config.width/2, game.config.height/1.2, 'pixel_font', 'press ENTER to Restart', 
        15, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        this.controlText.postFX.addGlow('0x2ef699', 1.5, 0)
        this.controlText.setOrigin(.5,0)

        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.keyENTER = keyboardInput.addKey(keycode.ENTER)
    }

    update(){
        if(this.keys.keyENTER.isDown){
            this.scene.start('titleScene')
        }
    }
}