class Level1 extends Phaser.Scene{
    constructor(){
        super('level1Scene')
    }

    create(){
        //add tilemap
        const map = this.add.tilemap('level1JSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage', 16, 16, 1, 2)

        const bgLayer = map.createLayer('Background', tileset, 0,0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

        terrainLayer.setCollisionByExclusion([-1])

        //init spawn points
        const player_spawn = map.findObject('Spawns', (obj) => obj.name === 'player_spawn')
        const cake_spawn = map.findObject('Spawns', (obj) => obj.name === 'cake')
        const barrel_spawn = map.findObject('Spawns', (obj) => obj.name === 'barrel')

        let character = this.game.settings.character

        //add player obj
        this.player = new Player(this, player_spawn.x, player_spawn.y, `${character}_idle`, 0, `${character}`).setOrigin(.5, 1)
        if(character === 'rigby'){
            this.player.setScale(.8)
        }

        //add barrel
        this.barrel = this.physics.add.sprite(barrel_spawn.x, barrel_spawn.y, 'barrel').setOrigin(0,.5)
        //this.barrel.setSize(this.barrel.width/2, this.barrel.height/2)
        this.barrel.setCircle(this.barrel.width/2, 0, 10)
        this.barrel.setScale(.8)
        this.barrel.setImmovable(true)
        this.barrel.body.setAllowGravity(false)

        //add cake obj
        this.cake = this.physics.add.sprite(cake_spawn.x, cake_spawn.y, 'cake').setImmovable(true)
        this.cake.body.setSize(this.cake.width/1.8, this.cake.height/1.5)
        this.cake.body.setAllowGravity(false)

        //add death box
        this.deadzone = this.add.rectangle(0, map.heightInPixels + 100, map.widthInPixels*16, 10, 0xFFFFFF, 0)
        this.physics.add.existing(this.deadzone)
        this.deadzone.body.setAllowGravity(false)

        //init collision handling
        this.terrainCollider = this.physics.add.collider(this.player, terrainLayer)
        this.cakeCollider = this.physics.add.overlap(this.player, this.cake, this.cakeCollide, null, this)
        this.barrelCollider = this.physics.add.collider(this.player, this.barrel)
        this.deadzoneCollider = this.physics.add.collider(this.player, this.deadzone, this.fall, null, this)

        //controls text
        this.text = this.add.bitmapText(player_spawn.x + 50, player_spawn.y - 200,'pixel_font', 'Arrows to Move\n\nSPACE to Jump', 10, Phaser.GameObjects.BitmapText.ALIGN_CENTER)
        this.text.postFX.addGlow('0x2ef699', 1.5, 0)
        this.text.setOrigin(.5,0)
        
        //Define input
        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.keySPACE = keyboardInput.addKey(keycode.SPACE)
        this.keys.keyENTER = keyboardInput.addKey(keycode.ENTER)

        // Follow player with camera
        this.cameras.main.startFollow(this.player, true, 1, 1, 0, 20);

        // Set zoom & pan camera
        this.cameras.main.setZoom(1.2);
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 200;
        this.physics.world.bounds.setTo(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels+300
        );

        //gameover flag
        this.gameover = false
    }

    update(){
        if(this.game.settings.lives > 0){
            this.playerFSM.step()
        }
        else{
            this.scene.start('gameOverScene')
        }
    }

    //Collision handlers HERE
    cakeCollide(player, cake){
        this.scene.start('level2Scene')
    }

    fall(player, deadzone){
        this.game.settings.lives -= 1
        this.scene.restart()
    }
}