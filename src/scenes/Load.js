class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload(){
        // this.load.image('forest', './assets/forest.png')
    }

    create(){
        //init logo
        this.logo = this.add.sprite(game.config.width/2, this.game.config.height/2, '', 0)
        
        
        //init timer
    }

    update(){
        //have timer that after 2 seconds fades out to character select
        //this.scene.start("menuScene")
    }
}