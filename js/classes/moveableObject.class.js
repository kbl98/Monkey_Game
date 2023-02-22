class MoveableObject extends DrawableObject {
  x = 200;
  current_img = 0;
  img;
  height = 100;
  width = 110;
  y = 270;
  offset=[];

  imgcache = [];
  speed;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.0;
  energy;
  hurt = false;
  lastHit = 0;
  deathdate = 0;
  collidable = true;
  dead = false;
  play=true;

  aplyGravity() {
    setInterval(() => {
      if (this.isInAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 40);
  }

  isInAir() {
    if (this instanceof Ball || this instanceof EndbossWeapon){
      return true;
    } else {
      return this.y <= 270;
    }
  }

  flipImg(ctx) {
    ctx.save();
    ctx.translate(this.width + 55, 0);
    ctx.scale(-1, 1);
    this.x = this.x * -1;
  }

  flipImgBack(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveRightMain() {
    this.x += this.speed;
    this.otherDirection = true;
  }

  moveLeftMain() {
    this.x -= this.speed;
    this.otherDirection = false;
  }

  jump() {
    this.speedY = 16;
  }

  playAnimation(images) {
    let i = this.current_img % images.length;
    let path = images[i];
    this.img = this.imgcache[path];
    this.current_img++;
  }

  playAnimationOnce(images) {
    for (let i = 0; i < images.length; i++) {
      let path = images[i];
      this.img = this.imgcache[path];
    }
  }

  hit() {
    this.energy -= 5;

    if (this.energy <= 0) {
      this.energy = 0;
      this.deathdate = new Date().getTime();
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width-10 > obj.x &&
      this.x+10 < obj.x &&
      this.y + this.height - 20 > obj.y &&
      this.y + 20 < obj.y + obj.height
    );
  }

  isCollidingTop(obj) {
    return (
      this.x + this.width > obj.x &&
      this.x < obj.x &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    );
  }

  isHurt() {
    let timespan = new Date().getTime() - this.lastHit;
    return timespan / 1000 < 0.3;
  }

  isDead() {
    return this.energy <= 0;
  }

  checkDeath() {
    if (this.isDead()) {
      this.dead = true;
    }
  }

  isLyingDead() {
    let timespan = new Date().getTime() - this.deathdate;
    return timespan / 1000 <= 1.5;
  }

  isGameover() {
    let timespan = new Date().getTime() - this.deathdate;
    return timespan / 1000 < 2.5 && timespan / 1000 > 1.5;
  }

  pauseMoves(){
    this.play=false;
  }

  moveObj(){
    this.play=true;
  }

  enemyIsHit() {
    this.hit();
    this.sound_hit.play();
   this.checkDeath();
  }
}




