class Lives extends Phaser.Scene{
    constructor(){
        super('liveScene')
    }

    create(){
        this.cameras.main.setBackgroundColor(0x012700)
        this.text = this.add.bitmapText(game.config.width/2, game.config.height/3, 'pixel_font', 'Player START', 18, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        this.text.postFX.addGlow('0x2ef699', 1.5, 0)
        this.text.setOrigin(.5,0)

        this.add.sprite(game.config.width/2 - 32, game.config.height/2 + 80, `${game.settings.character}_head`).setScale(2)
        this.add.bitmapText(game.config.width/2 + 20, game.config.height/2 + 30, 'pixel_font', `x ${game.settings.lives}`, 18, Phaser.GameObjects.BitmapText.ALIGN_CENTER).postFX.addGlow('0x2ef699', 1.5, 0)

        this.time.delayedCall(1000, () => {
            this.scene.start('level1Scene')
        })
    }
}