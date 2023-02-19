class Bomb extends MoveableObject {
  y = 350;
  width = 30;
  height = 30;
  random = true;

  constructor(x) {
    super().loadImg(
      "../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Projectile/4.png"
    );
    this.x = x;
    // this.animate();
  }

  removeBomb() {
    this.y = 6000;
  }
}
