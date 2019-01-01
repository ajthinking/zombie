import animations from './animations.js'
import settings from './settings.js'
import Human from './Human.js';

class ZombieGame {
    constructor(game) {
        this.game = game
    }

    addZombie() {
        var shapes = this.game.cache.json.get('shapes');
        var zombie = this.game.matter.add.sprite(400,400, 'sheet', 'orange', {shape: shapes.orange});
        zombie.setCircle(12);
        zombie.setFrictionAir(0.15);
        zombie.setMass(30);
        zombie.interval = 2;
        zombie.anims.load('zombie-walk');
        zombie.anims.play('zombie-walk');
        zombie.setCollidesWith([this.game.cat1]);
        this.game.zombies.push(zombie)
    }

    addHuman() {
        this.game.human = this.game.matter.add.sprite(100, 100, 'mummy');
        this.game.human.isHuman = true;
        this.game.human.setCircle(24);
        this.game.human.anims.load('human-walk');
        this.game.human.anims.play('human-walk');
        
        this.game.human.setCollisionCategory(this.game.cat1);
    
        this.game.human.setFrictionAir(0.15);
        this.game.human.setMass(300);
        this.game.human.setFixedRotation();
    }    

    update() {
        if (this.game.cursors.left.isDown)
        {
            this.game.human.setAngularVelocity(-0.1);
        }
        else if (this.game.cursors.right.isDown)
        {
            this.game.human.setAngularVelocity(0.1);
        }
    
        if (this.game.cursors.up.isDown)
        {
            this.game.human.thrust(0.8);
        }
    
        this.game.zombies.forEach(function(zombie) {
            var d = new Date();
            var n = d.getSeconds();
            if(n % zombie.interval == 0) {
                zombie.dir = Math.random()*0.03
                zombie.setAngularVelocity(0.02);
            }
    
            zombie.thrust(zombie.dir - 0.01)
        })
    
        if(this.game.spaceBar.isDown) {
            
            var boom = this.game.add.sprite(
                this.game.human.x+300*Math.cos(2*Math.PI*this.game.human.angle/360),
                this.game.human.y+300*Math.sin(2*Math.PI*this.game.human.angle/360),
                'boom',
                23
            );
            
            this.game.gun.play()
            
            boom.anims.play('explode')
        }        
    }
}

export default ZombieGame;