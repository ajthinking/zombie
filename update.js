import animations from './animations.js'
import settings from './settings.js'

export default function() {
    if (this.cursors.left.isDown)
    {
        this.human.setAngularVelocity(-0.1);
    }
    else if (this.cursors.right.isDown)
    {
        this.human.setAngularVelocity(0.1);
    }

    if (this.cursors.up.isDown)
    {
        this.human.thrust(0.8);
    }

    this.zombies.forEach(function(zombie) {
        var d = new Date();
        var n = d.getSeconds();
        if(n % zombie.interval == 0) {
            zombie.dir = Math.random()*0.03
            zombie.setAngularVelocity(0.02);
        }

        zombie.thrust(zombie.dir - 0.01)
    })

    if(this.spaceBar.isDown) {
        
        var boom = this.add.sprite(
            this.human.x+300*Math.cos(2*Math.PI*this.human.angle/360),
            this.human.y+300*Math.sin(2*Math.PI*this.human.angle/360),
            'boom',
            23
        );
        
        this.gun.play()
        
        boom.anims.play('explode')
    }
}