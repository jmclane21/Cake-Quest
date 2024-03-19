class Credits extends Phaser.Scene{
    constructor(){
        super('creditsScene')
    }

    create(){
        
        this.text = this.add.bitmapText(game.config.width/2, game.config.height/5, 'pixel_font', 
        `Made by Jackson McLane
Music: Chiptune Grooving by 8059346
SoundFX Made using jsfxr

Based on Regular Show
        
Press ENTER to return to Title`, 
            20, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        this.text.postFX.addGlow('0x2ef699', 1.5, 0)
        this.text.setOrigin(.5,0)

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            //this.sound.play('menu_select')
            this.scene.start('titleScene')
        }
    }
}