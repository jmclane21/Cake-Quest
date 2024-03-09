class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload(){
        this.load.image('logo', './assets/logo.png')

        this.load.image('tilesetImage', './assets/tileset.png')
        this.load.tilemapTiledJSON('level1JSON', './assets/level1.json')

        this.load.image('barrel', './assets/barrel.png')
        this.load.image('mordekai_idle', './assets/mordekai_idle.png')
        this.load.image('rigby_idle', './assets/rigby_idle.png')



        this.load.bitmapFont('pixelFont', './assets/depixel_bold.png', './assets/depixel_bold.xml')
    }

    create(){
        //init logo
        this.logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo').setScale(3)
        this.text = this.add.bitmapText(100, 240, 'pixelFont',
        'A Zipgidz Production', 32)
        this.text.setDropShadow(2,2, '0xacfc9c')
     
        
        //init timer
        this.time.delayedCall(2000, () => {
            this.scene.start('titleScene')
        })
    }

}