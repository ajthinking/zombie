import animations from './animations.js'

animations()

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: {
        preload: function() {
            this.load.audio('bg', [
                'audio/zombie.mp3'
              ]);
              this.load.audio('machine-gun', [
                'audio/machine-gun.mp3'
              ]);      
            
            this.load.image('block', 'assets/sprites/block.png');
            this.load.image('ship', 'assets/sprites/x2kship.png');
            this.load.json('shapes', 'assets/physics/fruit-shapes.json');
        
            this.load.atlas('sheet', 'assets/physics/fruit-sprites-zombie.png', 'assets/physics/fruit-sprites.json');
            
            
            this.load.atlas('our-sheet', 'data/atlas.png', 'data/atlas.json');
            this.load.atlas('new-sheet', 'data/packer-test.png', 'data/packer-test.json');
            this.load.spritesheet('boom', 'assets/sprites/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
        
            //
            this.load.spritesheet('mummy', 'assets/animations/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });            
        },
        create: function() {
            var humanWalk = {
                key: 'human-walk',    
                frames: [
                    {key: "new-sheet", frame: "human1.png"},
                    {key: "new-sheet", frame: "human2.png"},
                    {key: "new-sheet", frame: "human3.png"},
                    {key: "new-sheet", frame: "human4.png"},
                ],
                frameRate: 6,
                
                repeat: -1
            };
            
            var zombieWalk = {
                key: 'zombie-walk',    
                frames: [
                    {key: "new-sheet", frame: "zombie1.png"},
                    {key: "new-sheet", frame: "zombie2.png"},
                    {key: "new-sheet", frame: "zombie3.png"},
                    {key: "new-sheet", frame: "zombie4.png"},
                    {key: "new-sheet", frame: "zombie5.png"},
                    {key: "new-sheet", frame: "zombie6.png"},
                ],
                frameRate: 6,
                
                repeat: -1
            };    
            
            
        
            this.anims.create(humanWalk);
            this.anims.create(zombieWalk);
            this.debug = true;
        
            this.sound_bg = this.sound.add('bg', { loop: true });
            this.gun = this.sound.add('machine-gun', { loop: false });
            //this.sound_bg.play()
        
            var shapes = this.cache.json.get('shapes');
            this.human = this.matter.add.sprite(100, 100, 'mummy');
            this.human.setCircle(12);
            this.human.anims.load('human-walk');
            this.human.anims.play('human-walk');
            //human.setScale() 
        
        
            this.human.setFrictionAir(0.15);
            this.human.setMass(30);
            this.human.setFixedRotation();
            this.zombies = []
            Array.apply(null, Array(100)).map(Number.prototype.valueOf,0).forEach(function(index, item) {
                var zombie = this.matter.add.sprite(400*Math.random()+item, 400*Math.random()+item, 'sheet', 'orange', {shape: shapes.orange});
                zombie.setCircle(12);
                zombie.setFrictionAir(0.15);
                zombie.setMass(30);
                zombie.dir = Math.random()*0.1
                zombie.interval = 2 + (item%3)
                zombieWalk = zombie.anims.load('zombie-walk');
                zombie.anims.play('zombie-walk');
                this.zombies.push(zombie)        
            }.bind(this));
        
            
        
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
                this.human.thrust(0.08);
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
                
                //boom = this.add.sprite(100, 100, 'boom', 23);
                
                boom.anims.play('explode')
            }            
        }
    }
};

var image;
var cursors;
var spaceBar;
var seed = 1;

var game = new Phaser.Game(config);

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}