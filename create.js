import animations from './animations.js'
import settings from './settings.js'
import Zombie from './Zombie.js'

export default function() {
    this.anims.create(animations.humanWalk);
    this.anims.create(animations.zombieWalk);

    this.sound_bg = this.sound.add('bg', { loop: true });
    this.gun = this.sound.add('machine-gun', { loop: false });
    settings.music ? this.sound_bg.play() : null;

    var shapes = this.cache.json.get('shapes');
    this.human = this.matter.add.sprite(100, 100, 'mummy');
    this.human.isHuman = true;
    this.human.setCircle(24);
    this.human.anims.load('human-walk');
    this.human.anims.play('human-walk');
    var cat1 = this.matter.world.nextCategory();
    this.human.setCollisionCategory(cat1);

    this.human.setFrictionAir(0.15);
    this.human.setMass(300);
    this.human.setFixedRotation();
    this.zombies = []
    Array.apply(null, Array(100)).map(Number.prototype.valueOf,0).forEach(function(index, item) {
        var zombie = this.matter.add.sprite(400*Math.random()+item, 400*Math.random()+item, 'sheet', 'orange', {shape: shapes.orange});
        zombie.setCircle(12);
        zombie.setFrictionAir(0.15);
        zombie.setMass(30);
        zombie.interval = 2 + (item%3)
        zombie.anims.load('zombie-walk');
        zombie.anims.play('zombie-walk');
        zombie.setCollidesWith([cat1]);
        this.zombies.push(zombie)
        var z = new Zombie();
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