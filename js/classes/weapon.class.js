class Weaponbar extends DrawableObject {
  y = 20;
  height = 18;
  width = 18;
  x = 295;
  allbombs = 0;

  /*images = [
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    "../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Projectile/4.png",
  ];*/

  constructor() {
    //super().loadImgs(this.images);
    super().loadImg(
        "../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Projectile/4.png"
    );
  }

  /*setPercentage(p) {
    let n = this.resolvePercentage();

    let path = this.images[n];

    this.img = this.imgcache[path];
  }

  resolvePercentage() {
    if (this.allbombs >= 20) {
      return 5;
    } else if (this.allbombs > 16) {
      return 4;
    } else if (this.allbombs > 12) {
      return 3;
    } else if (this.allbombs > 8) {
      return 2;
    } else if (this.allbombs > 4) {
      return 1;
    } else {
      return 0;
    }
  }

  drawBall(ctx) {
    ctx.drawImage(
      this.imgcache[this.images[6]],
      this.x + 5,
      this.y + 10,
      25,
      25
    );
  }*/
}
