import animations from './animations.js'
import preload from './preload.js'
import create from './create.js'
import update from './update.js'
import settings from './settings.js'
import Zombie from './Zombie.js'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            debug: settings.debug,
            gravity: {x: 0, y: 0}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);