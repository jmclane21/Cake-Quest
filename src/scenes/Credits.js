class Credits extends Phaser.Scene{
    constructor(){
        super('creditsScene')
    }

    create(){
        let scoreConfig = {
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
        this.add.text(game.config.width/2, this.game.config.height/2,
            `Made by Jackson McLane\nBased on Regular Show\nPress ENTER to return to Title`,
            scoreConfig).setOrigin(.5)
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            //this.sound.play('menu_select')
            this.scene.start('titleScene')
        }
    }
}