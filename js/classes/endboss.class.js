class Endboss extends MoveableObject {
  x = 5950;
  speed = 5;
  x = 5950;
  energy = 30;
  left = true;
  sound_hit = new Audio("audio/endboss_hurt.mp3");
  play=true;
  weapon="";

  IMGS_WALK =endboss_walk
  IMGS_Dead = endboss_dead
  IMGS_ATTACK =  endboss_attack

  constructor() {
    super().loadImg(
      "../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Characters/Characters 02/Walk/Walk_00.png"
    );
    this.loadImgs(this.IMGS_ATTACK);
    this.loadImgs(this.IMGS_Dead);
    this.height = 300;
    this.width = 280;
    this.y = 130;
    this.x = 5950;
    this.offset.bottom=0;
    this.offset.top=0;
    this.offset.left=0;
    this.offset.right=0;
    this.loadImgs(this.IMGS_WALK);
    this.animate();
    this.hasBall();
  }

  animate() {
    setInterval(() => {
        if(this.play==true){
      if (!this.isDead()) {
        this.move();
      }
    }}, 1000 / 60);

    setInterval(() => {
        if(this.play==true){
      if (this.isDead()) {
        this.playAnimationOnce(this.IMGS_Dead);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMGS_ATTACK);
      } else {
        this.playAnimation(this.IMGS_WALK);
      }
    }}, 1000 / 60);
  }

  move() {
    let stop = 5800 - Math.random() * 4000;
    if (this.x >= stop && this.x < 6980 && this.left == true) {
      this.moveLeftMain();
    } else {
      this.left = false;
      this.moveRightMain();

      if (this.x >= 6950) {
        this.left = true;
      }
    }
  }

  hasBall(){
    
    setInterval(()=>{
      if(!this.dead==true){
        this.weapon=new EndbossWeapon(this);
      }
    },1500)
  }
}
