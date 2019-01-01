import animations from './animations.js'
import settings from './settings.js'
import Zombie from './Zombie.js'
import ZombieGame from './ZombieGame.js'

export default function() {
    this.zombieGame = new ZombieGame(this)

    this.anims.create(animations.humanWalk);
    this.anims.create(animations.zombieWalk);

    this.sound_bg = this.sound.add('bg', { loop: true });
    this.gun = this.sound.add('machine-gun', { loop: false });
    settings.music ? this.sound_bg.play() : null;
    this.cat1 = this.matter.world.nextCategory();
    var shapes = this.cache.json.get('shapes');
    this.zombies = []

    this.zombieGame.addHuman()

    Array.apply(null, Array(1)).map(Number.prototype.valueOf,0).forEach(function(index, item) {
        //Zombie.addTo(this);
        this.zombieGame.addZombie()
    }.bind(this));

    this.matter.world.on('collisionstart', function (event, unit1, unit2) {
        console.log(unit1, unit2)
    });

    this.matter.world.setBounds(0, 0, 800, 600);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    /******** */

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23, first: 23 }),
        frameRate: 100,
        repeat: false,
        repeatDelay: 2
    });      
}