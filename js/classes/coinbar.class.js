class Coinbar extends DrawableObject {
  y = -12;
  height = 80;
  width = 80;
  x = 170;
  allcoins = 0;

 /* images = [
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../img/img 4/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];*/

  constructor() {
    super().loadImg(
        "../img/img 4/8_coin/coin_1.png"
      );
   // this.loadImgs(this.images);

   
  }

  /*setPercentage(p) {
    let n = this.resolvePercentage();

    let path = this.images[n];

    this.img = this.imgcache[path];
  }

  resolvePercentage() {
    if (this.allcoins >= 20) {
      return 5;
    } else if (this.allcoins > 16) {
      return 4;
    } else if (this.allcoins > 12) {
      return 3;
    } else if (this.allcoins > 8) {
      return 2;
    } else if (this.allcoins > 4) {
      return 1;
    } else {
      return 0;
    }
  }*/


}
