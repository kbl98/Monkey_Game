class Statusbar extends DrawableObject {
  y = 0;
  height = 40;
  width = 150;
  x = 0;
  persentage = 100;

  images = [
    "../img/img 4/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "../img/img 4/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../img/img 4/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../img/img 4/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../img/img 4/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../img/img 4/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor() {
    super().loadImgs(this.images);
    this.loadImg(
      "../img/img 4/7_statusbars/1_statusbar/2_statusbar_health/blue100.png"
    );
  }

  setPercentage(p) {
    let n = this.resolvePercentage();

    let path = this.images[n];

    this.img = this.imgcache[path];
  }

  resolvePercentage() {
    if (this.persentage == 100) {
      return 5;
    } else if (this.persentage > 80) {
      return 4;
    } else if (this.persentage > 60) {
      return 3;
    } else if (this.persentage > 40) {
      return 2;
    } else if (this.persentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
