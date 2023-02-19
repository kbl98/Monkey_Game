class BackgroundObject extends MoveableObject {
  constructor(path, x, y, width, height) {
    super().loadImg(path);
    this.width = width;
    this.height = height;
    this.y = y;
    this.x = x;
  }
}
