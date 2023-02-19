class Character extends MoveableObject {
  height = 130;
  width = 110;
  sound_walk = new Audio("../audio/walk.mp3");
  speed = 10;
  energy = 100;
  dead = false;
  ball;
  balls=[];
  isCollectingBombs;
  throw = false;
  sound_jump = new Audio("../audio/jump.mp3");
  sound_throw = new Audio("../audio/throw.mp3");
  sound_win = new Audio("../audio/win.mp3");
  sound_die = new Audio("../audio/die.mp3");
  sound_hit = new Audio("../audio/hit.mp3");
  sound_birds = new Audio("../audio/birds.mp3");
  sound_hurt = new Audio("../audio/hurt.mp3");
  sound_collect_weapon = new Audio("../audio/collect_weapon.mp3");
  play=true;

  IMGS_IDLE = [
    "../img/craftpix-net-546825-monkey-game-character-sprite/PNG/Walk/Wukong-Walk_0.png",
  ];

  IMGS_WALK = character_walk
  

  IMGS_JUMP = character_jump;

  IMGS_HIT = character_hit;

  IMGS_GETHIT = character_gethit;

  IMGS_DIE = character_die;
  IMGS_THROW = character_throw;

  IMGS_CELEBRATES = character_celabrates;

  IMGS_GLIDE = character_glide;

  IMG_Fireball =
    "../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Projectile/1.png";

  //jump=new Imagecache(this.IMGS_JUMP);
  //walk=new Imagecache(this.IMGS_WALK);

  world;

  constructor() {
    super().loadImg(
      "../img/craftpix-net-546825-monkey-game-character-sprite/PNG/Walk/Wukong-Walk_0.png"
    );
    this.loadImgs(this.IMGS_WALK);
    this.loadImgs(this.IMGS_JUMP);
    this.loadImgs(this.IMGS_DIE);
    this.loadImgs(this.IMGS_GETHIT);
    this.loadImgs(this.IMGS_CELEBRATES);
    this.loadImgs(this.IMGS_GLIDE);
    this.loadImgs(this.IMGS_THROW);
    this.loadImgs(this.IMGS_IDLE);
    this.aplyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
        if(this.play==true){
      this.sound_walk.pause();
      if (
        this.world.keyboard.RIGHT &&
        this.x < level_1.level_end &&
        this.dead == false
      ) {
        this.moveRight();
        this.sound_walk.play();
      }

      if (this.world.keyboard.LEFT && this.x > 200 && this.dead == false) {
        this.moveLeft();
        this.sound_walk.play();
      }

      if (this.world.keyboard.UP && this.y >= 270 && this.dead == false) {
        this.jump();
        this.sound_jump.play();
      }

      if (this.world.keyboard.SPACE && this.dead == false && this.hasBall()) {
        this.world.keyboard.SPACE = false;
        this.world.keyboard.LEFT=false;
        this.world.keyboard.RIGHT=false
        this.ball = new Ball(this);
        this.balls.push(new Ball(this))


        this.throw = true;
        this.lessBall();
      }

      if (this.world.keyboard.DOWN && this.dead == false) {
        this.isCollectingBombs = true;
      }

      this.world.camera_x = -this.x + 200;
  }}, 1000 / 60);

    setInterval(() => {
        if(this.play==true){
      if (
        this.world.level.endboss.dead == true &&
        this.world.level.endboss.isLyingDead()
      ) {
        this.playAnimation(this.IMGS_CELEBRATES);
        this.sound_win.play();
      } else if (this.dead == true && this.isLyingDead()) {
        this.playAnimationOnce(this.IMGS_DIE);
        this.sound_die.play();
      } else if (
        (this.dead == true && !this.isGameover()) ||
        (this.world.level.endboss.dead == true &&
          !this.world.level.endboss.isGameover())
      ) {
        this.world.end = true;
        this.world.showStartscreen();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMGS_GETHIT);
      } else if (this.isInAir() && this.dead == false) {
        this.playAnimation(this.IMGS_JUMP);
      } else if (this.isCollectingBombs && this.world.keyboard.DOWN == true) {
        this.playAnimation(this.IMGS_GLIDE);
      } else if (this.throw == true) {
        this.playAnimation(this.IMGS_THROW);
        this.sound_throw.play();
        this.throw = false;
      } else if (
        (this.world.keyboard.RIGHT && this.dead == false) ||
        (this.world.keyboard.LEFT && this.dead == false)
      ) {
        this.playAnimation(this.IMGS_WALK);
      } else {
        this.playAnimation(this.IMGS_IDLE);
        this.sound_birds.play();
      }
  }}, 1000 / 30);
  }

  hasBall() {
    console.log(this.world.weaponbar.allbombs > 0);
    return this.world.weaponbar.allbombs > 0;
  }

  lessBall() {
    this.world.weaponbar.allbombs -= 1;
    console.log(this.world.weaponbar.allbombs);
    //if ( this.world.weaponbar.allbombs<1){
    //  this.world.weaponbar.allbombs=0;
    // }
  }
}



/* playAnimation(images){
    let i=this.current_img % images.length;
    let path=images[i];
    this.img=this.imgcache[path];
    this.current_img++
    }*/
