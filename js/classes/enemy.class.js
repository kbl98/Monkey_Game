class Enemy extends MoveableObject {
  height = 90;
  width = 90;
  y = 300;
  energy = 5;
  dead = false;
  sound_hit = new Audio("audio/hit_enemy.mp3");

  IMGS_WALK_EY = enemy_walk;
  IMGS_DEAD = enemy_dead;

  constructor() {
    super().loadImg(
      "../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Characters/Characters 04/Idle/Idle_00.png"
    );
    this.x = 1020 + Math.random() * 4500;
    this.speed = 0.35 + Math.random() * 0.45;
    this.loadImgs(this.IMGS_WALK_EY);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.play == true) {
        if (this.dead == true) {
          this.dieEnemy();
        } else {
          this.playAnimation(this.IMGS_WALK_EY);
          this.moveLeftMain();
        }
      }
    }, 1000 / 60);
  }

  dieEnemy() {
    this.removeEnemy();
  }

  removeEnemy() {
    if (this.dead == true) {
      this.y += 6000;
    }
  }

  
}
