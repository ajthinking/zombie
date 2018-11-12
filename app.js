import animations from './animations.js'
import preload from './preload.js'
import settings from './settings.js'

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
        create: function() {
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
            var cat2 = this.matter.world.nextCategory();
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
            }.bind(this));
        
            this.matter.world.on('collisionstart', function (event) {

                console.log("YEAH!")
        
            });


            
        
            this.matter.world.setBounds(0, 0, 800, 600);
        
            cursors = this.input.keyboard.createCursorKeys();
            spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
            /******** */
        
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23, first: 23 }),
                frameRate: 100,
                repeat: false,
                repeatDelay: 2
            });            
        },
        update: function() {
            if (cursors.left.isDown)
            {
                this.human.setAngularVelocity(-0.1);
            }
            else if (cursors.right.isDown)
            {
                this.human.setAngularVelocity(0.1);
            }
        
            if (cursors.up.isDown)
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
        
            if(spaceBar.isDown) {
                
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
    }
};

var image;
var cursors;
var spaceBar;

var game = new Phaser.Game(config);