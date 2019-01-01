import animations from './animations.js'
import settings from './settings.js'

class Human {
    constructor() {
        
    }
    
    static addTo(game) {
        game.human = game.matter.add.sprite(100, 100, 'mummy');
        game.human.isHuman = true;
        game.human.setCircle(24);
        game.human.anims.load('human-walk');
        game.human.anims.play('human-walk');
        
        game.human.setCollisionCategory(game.cat1);
    
        game.human.setFrictionAir(0.15);
        game.human.setMass(300);
        game.human.setFixedRotation();   
    }

    update() {
        console.log("Human is updating...")
    }
}


export default Human;