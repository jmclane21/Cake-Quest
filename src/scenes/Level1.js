class Level1 extends Phaser.Scene{
    constructor(){
        super('level1Scene')
    }

    create(){
        //add tilemap
        const map = this.add.tilemap('level1JSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        const bgLayer = map.createLayer('Background', tileset, 0,0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

        terrainLayer.setCollisionByExclusion([-1])

        //init spawn points
        const player_spawn = map.findObject('Spawns', (obj) => obj.name === 'player_spawn')
        const cake_spawn = map.findObject('Spawns', (obj) => obj.name === 'cake')

        //add player obj
        this.player = new Player(this, player_spawn.x, player_spawn.y, 'mordekai_idle', 0, 'mordekai').setOrigin(.5, 1)

        //add cake obj
        this.cake = this.physics.add.sprite(cake_spawn.x, cake_spawn.y, 'cake').setImmovable(true)
        this.cake.body.setSize(this.cake.width/2, this.cake.height/1.5)
        this.cake.body.setAllowGravity(false)

        //init collision handling
        this.terrainCollider = this.physics.add.collider(this.player, terrainLayer)
        this.cakeCollider = this.physics.add.overlap(this.player, this.cake, this.cakeCollide, null, this)

        
        //Define input
        let keyboardInput = this.input.keyboard
        let keycode = Phaser.Input.Keyboard.KeyCodes
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.keySPACE = keyboardInput.addKey(keycode.SPACE)
        this.keys.keyENTER = keyboardInput.addKey(keycode.ENTER)

        // Follow player with camera
        this.cameras.main.startFollow(this.player, true, 1, 1, 0, 20);

        // Set zoom & pan camera
        this.cameras.main.setZoom(1);
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
            map.heightInPixels
        );

        //gameover flag
        this.gameover = false
    }

    update(){
        this.playerFSM.step()
    }

    //Collision handlers HERE
    cakeCollide(player, cake){
        this.scene.start('titleScene')
    }
}