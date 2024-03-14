class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, character){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)


        this.body.setSize(this.width / 4, this.height/1.5)
        //this.body.setCollideWorldBounds(true)

        this.character = character
        this.velocity = 150    // in pixels
        this.jumpVelocity = 250
        this.acceleration = 150

        // initialize state machine managing player (initial state, possible states, state args[])
        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState()
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// player-specific state classes
class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        //player.anims.play(`${character}_idle`)
        //player.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space } = scene.keys
        const enter = scene.keys.keyENTER
        //const HKey = scene.keys.HKey

        // // transition to swing if pressing space
        // if(Phaser.Input.Keyboard.JustDown(enter)) {
        //     this.stateMachine.transition('swing')
        //     return
        // }

        // hurt if H key input (just for demo purposes)
        // if(Phaser.Input.Keyboard.JustDown(HKey)) {
        //     this.stateMachine.transition('hurt')
        //     return
        // }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }

        if(space.isDown || up.isDown){
            if(player.body.blocked.down){
                this.stateMachine.transition('jump')
            }
        }
    }
}

class MoveState extends State {
    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space } = scene.keys
        const enter = scene.keys.keyENTER

        // transition to swing if pressing enter
        // if(Phaser.Input.Keyboard.JustDown(enter)) {
        //     this.stateMachine.transition('swing')
        //     return
        // }

        // hurt if H key input (just for demo purposes)
        // if(Phaser.Input.Keyboard.JustDown(HKey)) {
        //     this.stateMachine.transition('hurt')
        //     return
        // }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        if(space.isDown || up.isDown){
            if(player.body.blocked.down){
                this.stateMachine.transition('jump')
            }
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(left.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
            player.setFlipX(true)
        } else if(right.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
            player.setFlipX(false)
        }
        // normalize movement vector, update player position, and play proper animation
        moveDirection.normalize()
        player.setVelocityX(player.velocity * moveDirection.x)
        //player.anims.play(`walk-${player.direction}`, true)
    }
}

class JumpState extends State{
    enter(scene, player) {
        //player.anims.play("jump");
        scene.sound.play('jump_sound', {volume: .5})
        player.setVelocityY(-player.jumpVelocity);
        player.body.setAccelerationY(player.acceleration)
    }

    execute(scene, player){
        const { left, right, up, down, space } = scene.keys

        if (player.body.blocked.down) {
            this.stateMachine.transition("idle");
            return;
          }

        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(left.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
            player.setFlipX(true)
        } else if(right.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
            player.setFlipX(false)
        }
        // normalize movement vector, update player position, and play proper animation
        moveDirection.normalize()
        player.setVelocityX(player.velocity * moveDirection.x)
    }
}