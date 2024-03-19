class Level2 extends Phaser.Scene{
    constructor(){
        super('level2Scene')
    }

    create(){
        //add tilemap
        const map = this.add.tilemap('level2JSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage', 16, 16, 1, 2)

        const bgLayer = map.createLayer('Background', tileset, 0,0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

        terrainLayer.setCollisionByExclusion([-1])

        //init spawn points
        const player_spawn = map.findObject('Spawns', (obj) => obj.name === 'player_spawn')
        const cake_spawn = map.findObject('Spawns', (obj) => obj.name === 'cake')
        this.bug_spawn_1 = map.findObject('Spawns', (obj) => obj.name === 'bug_spawn_1')
        this.bug_spawn_2 = map.findObject('Spawns', (obj) => obj.name === 'bug_spawn_2')

        let character = this.game.settings.character

        //add player obj
        this.player = new Player(this, player_spawn.x, player_spawn.y, `${character}_idle`, 0, `${character}`).setOrigin(.5, 1)
        if(character === 'rigby'){
            this.player.setScale(.8)
        }

        //add cake obj
        this.cake = this.physics.add.sprite(cake_spawn.x, cake_spawn.y, 'cake').setImmovable(true)
        this.cake.body.setSize(this.cake.width/1.8, this.cake.height/1.5)
        this.cake.body.setAllowGravity(false)

        //add bug
        this.bug = this.physics.add.sprite(this.bug_spawn_1.x, this.bug_spawn_1.y, 'bug')
        //this.bug = this.physics.add.sprite(player_spawn.x + 100, player_spawn.y, 'bug')
        this.bug.setOrigin(.5, 1)
        this.bug.body.setSize(this.bug.body.width/2, this.bug.body.height/4)
        this.bug.body.setOffset(30, 60)
        this.bug.setVelocityX(50)

        //add death box
        this.deadzone = this.add.rectangle(0, map.heightInPixels + 100, map.widthInPixels*16, 10, 0xFFFFFF, 0)
        this.physics.add.existing(this.deadzone)
        this.deadzone.body.setAllowGravity(false)

        //init collision handling
        this.terrainCollider = this.physics.add.collider([this.player, this.bug], terrainLayer)
        this.cakeCollider = this.physics.add.overlap(this.player, this.cake, this.cakeCollide, null, this)
        this.barrelCollider = this.physics.add.collider(this.player, this.barrel)
        this.enemyCollider = this.physics.add.collider(this.player, [this.deadzone, this.bug], this.die, null, this)

        
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

            if(this.bug.x <= this.bug_spawn_1.x){
                this.bug.setVelocityX(50)
                this.bug.setFlipX(true)
            }
            if(this.bug.x >= this.bug_spawn_2.x){
                this.bug.setVelocityX(-50)
                this.bug.setFlipX(false)
            }

        }
        else{
            this.scene.start('gameOverScene')
        }
    }

    //Collision handlers HERE
    cakeCollide(player, cake){
        this.sound.play('cake_sound')
        this.scene.start('gameOverScene')
    }

    die(player, deadzone){
        this.sound.play('hurt_sound')
        this.game.settings.lives -= 1
        this.scene.restart()
    }
}