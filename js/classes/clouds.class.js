class Cloud extends MoveableObject {
  height = 100;
  width = 500;
  x_start;
  speed = 0.05;

  constructor() {
    super().loadImg("../img/cloud.png");
    this.y = 0 + Math.random() * 120;
    this.x = 0 + Math.random() * 6000;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeftMain(), 1000 / 20;
    });
  }
}
