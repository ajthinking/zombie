export default function() {
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
}