class DrawableObject {
  x;

  img;
  height;
  width;
  y;
  imgcache = [];

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImgs(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgcache[path] = img;
    });
  }

  drawObj(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Enemy ||
      this instanceof Endboss ||
      this instanceof Ball ||
      this instanceof EndbossWeapon

    ) {
      ctx.beginPath();
      ctx.linewidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
