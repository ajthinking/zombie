var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1b1464',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var image;
var cursors;
var seed = 1;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.audio('bg', [
        'audio/zombie.mp3'
      ]);
    
    this.load.image('block', 'assets/sprites/block.png');
    this.load.image('ship', 'assets/sprites/x2kship.png');
    this.load.json('shapes', 'assets/physics/fruit-shapes.json');

    this.load.atlas('sheet', 'assets/physics/fruit-sprites-zombie.png', 'assets/physics/fruit-sprites.json');
    
    
    this.load.atlas('our-sheet', 'data/atlas.png', 'data/atlas.json');
    this.load.spritesheet('boom', 'assets/sprites/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
}

function create ()
{
    this.sound_bg = this.sound.add('bg', { loop: true });
    this.sound_bg.play()
    var shapes = this.cache.json.get('shapes');
    human = this.matter.add.sprite(300, 400, 'ship');
    human.setFrictionAir(0.15);
    human.setMass(30);
    human.setFixedRotation();
    zombies = []
    Array.apply(null, Array(10)).map(Number.prototype.valueOf,0).forEach(function(index, item) {
        var zombie = this.matter.add.sprite(400*Math.random()+item, 400*Math.random()+item, 'sheet', 'orange', {shape: shapes.orange});
        zombie.setFrictionAir(0.15);
        zombie.setMass(30);
        zombie.dir = Math.random()*0.1
        zombie.interval = 2 + (item%3)
        //zombie.setFixedRotation();
        zombies.push(zombie)        
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
}


    function update ()
{
    if (cursors.left.isDown)
    {
        human.setAngularVelocity(-0.1);
    }
    else if (cursors.right.isDown)
    {
        human.setAngularVelocity(0.1);
    }

    if (cursors.up.isDown)
    {
        human.thrust(0.08);
    }

    zombies.forEach(function(zombie) {
        var d = new Date();
        var n = d.getSeconds();
        if(n % zombie.interval == 0) {
            zombie.dir = Math.random()*0.1
            zombie.setAngularVelocity(0.02);
        }

        zombie.thrust(zombie.dir - 0.05)
    })

    if(spaceBar.isDown) {
        
        var boom = this.add.sprite(
            human.x+300*Math.cos(2*Math.PI*human.angle/360),
            human.y+300*Math.sin(2*Math.PI*human.angle/360),
            'boom',
            23
        );
        
        
        //boom = this.add.sprite(100, 100, 'boom', 23);
        
        boom.anims.play('explode')
    }

}

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}