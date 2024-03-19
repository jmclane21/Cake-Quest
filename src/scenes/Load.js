class Load extends Phaser.Scene{
    constructor(){
        super("loadScene")
    }

    preload(){
        this.load.image('logo', './assets/logo.png')

        this.load.image('tilesetImage', './assets/tileset_extruded.png')
        this.load.tilemapTiledJSON('level1JSON', './assets/level1.json')
        this.load.tilemapTiledJSON('level2JSON', './assets/level2.json')

        this.load.audio('music', './assets/chiptune_grooving.mp3')

        this.load.image('mordekai_idle', './assets/mordekai_idle.png')
        this.load.image('mordekai_jump', './assets/mordekai_jump.png')
        this.load.image('mordekai_head', './assets/mordekai_head.png')
        this.load.image('rigby_idle', './assets/rigby_idle.png')
        this.load.image('rigby_jump', './assets/rigby_jump.png')
        this.load.image('rigby_head', './assets/rigby_head.png')

        this.load.image('bug', './assets/bug.png')
        this.load.image('barrel', './assets/barrel.png')
        this.load.image('cake', './assets/cake.png')
        this.load.spritesheet('cake_detail', './assets/cake_detail.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.image('box', './assets/box.png')

        this.load.audio('jump_sound', './assets/jump.wav')
        this.load.audio('cake_sound', './assets/powerUp.wav')
        this.load.audio('hurt_sound', './assets/hitHurt.wav')

        this.load.bitmapFont('pixel_font', './assets/depixel_bold.png', './assets/depixel_bold.xml')
    }

    create(){
        //init logo
        this.logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo').setScale(3)
        this.text = this.add.bitmapText(100, 240, 'pixel_font',
        'A Zipgidz Production', 32)
        this.text.postFX.addGlow('0x2ef699', 2, 0)

        //init timer
        this.time.delayedCall(2000, () => {
            this.scene.start('titleScene')
        })
    }

}