import animations from './animations.js'
import settings from './settings.js'

class Zombie {
    constructor(game) {
        
    }

    static addTo(game) {
        var shapes = game.cache.json.get('shapes');
        var zombie = game.matter.add.sprite(400,400, 'sheet', 'orange', {shape: shapes.orange});
        zombie.setCircle(12);
        zombie.setFrictionAir(0.15);
        zombie.setMass(30);
        zombie.interval = 2;
        zombie.anims.load('zombie-walk');
        zombie.anims.play('zombie-walk');
        zombie.setCollidesWith([game.cat1]);
        game.zombies.push(zombie)
    }
}

export default Zombie;