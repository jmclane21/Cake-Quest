class Character extends Phaser.Scene{
    constructor(){
        super('characterScene')
    }

    create(){
        this.cameras.main.setBackgroundColor(0x012700)
        this.text = this.add.bitmapText(game.config.width/2, game.config.height/5, 'pixel_font', 'CHOOSE YOUR HERO:', 20, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        this.text.postFX.addGlow('0x2ef699', 1.5, 0)
        this.text.setOrigin(.5,0)

        this.mordekai = this.add.sprite(game.config.width/6, game.config.height-100, 'mordekai_idle').setOrigin(0,1).setScale(2)
        this.rigby = this.add.sprite(game.config.width*3/6, game.config.height-100, 'rigby_idle').setOrigin(0,1).setScale(1.5)

        this.box = this.add.sprite(this.mordekai.x, this.mordekai.y, 'box').setOrigin(0,1).setScale(2)

        this.character = 'mordekai'

        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.keySPACE = keyboardInput.addKey(keycode.SPACE)
        this.keys.keyENTER = keyboardInput.addKey(keycode.ENTER)
    }

    update(){
        if(this.keys.left.isDown){
            this.box.setPosition(this.mordekai.x, this.mordekai.y)
            this.character = 'mordekai'
        }

        if(this.keys.right.isDown){
            this.box.setPosition(this.rigby.x - this.rigby.width/3, this.rigby.y)
            this.character = 'rigby'
        }

        if(this.keys.keySPACE.isDown || this.keys.keyENTER.isDown){
            //this.sound.play('menu_select')
            game.settings = {
                character: this.character,
                lives: 5
            }
            this.scene.start('liveScene')
        }
    }
}