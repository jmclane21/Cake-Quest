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

        //add player obj
        this.player = new Player(this, 40, 300, 'mordekai_idle', 0, 'mordekai')

        //add enemy objs

        //enemy group

        //init collision handling
        this.terrainCollider = this.physics.add.collider(this.player, terrainLayer)

        
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
        
        if(!this.gameover){

        }
        else{

        }
    }

    //Collision handlers HERE
}