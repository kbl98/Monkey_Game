class World {
  camera_x = 0;
  camera_y = 0;
  character = new Character();
  level = level_1;
  // ball=new Ball(this.character)
  number_bombs = 0;
  number_coins = 0;
  ball;
  run = true;
  end = false;
  canvas;
  ctx;
  keyboard;
  statusbar = new Statusbar();
  coinbar = new Coinbar();
  weaponbar = new Weaponbar();
  endscreen = new Endscreen();
  play=true;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font= '200 20px DripOctober-vm0JA';
    this.ctx.fillStyle="green";
    this.keyboard = keyboard;
    this.setWorld();
    console.log(statusbar);
    this.draw();
    this.runGame();
    this.writeStatusbar();
    //this.writeCoinbar();
    //this.writeWeaponbar();
    this.pauseGame();
    this.setPlay()
  }

  setWorld() {
    this.character.world = this;
  }

  runGame() {
    setInterval(() => {
      if(this.play==true){
      this.checkCollision();
    }}, 1000 / 60);
  }

  checkCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.countCoins();
        coin.sound.play();
        coin.removeCoin();
      }
    });

    this.level.bombs.forEach((bomb) => {
      if (
        this.character.isColliding(bomb) &&
        this.character.isCollectingBombs == true &&
        this.keyboard.DOWN == true
      ) {
        this.character.isCollectingBombs = false;
        this.character.sound_collect_weapon.play();
        this.countBombs();
        bomb.removeBomb();
      }
    });

    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.fromAbove(enemy)) {
          enemy.hit();
          enemy.sound_hit.play();
          this.character.y = 100;
          enemy.checkDeath();
        } else if (!this.character.isHurt()) {
          this.character.hit();
          this.character.sound_hurt.play();
          this.character.checkDeath();
        }
      }
    });

    this.character.balls.forEach((ball) =>{
    if (this.character.balls) {
      if (
       ball.isColliding(this.level.endboss) &&
        !this.level.endboss.isHurt()
      ) {
        ball.bounce();
        this.level.endboss.hit();
        console.log(this.level.endboss.energy)
        this.level.endboss.sound_hit.play();
        this.level.endboss.checkDeath();
      }}})
    

    if (this.character.isColliding(this.level.endboss) || this.character.isColliding(this.level.endboss.weapon)) {
      if (!this.character.isHurt()) {
        this.character.hit();
        this.character.checkDeath();
      }
    }
  }

  /*getBounce(){
    this.character.x-=10;
    this.character.y-=20
  }*/

  fromAbove(enemy) {
    if (this.character.speedY < 0 && this.character.y + 50 < enemy.y) {
      return true;
    }
  }

  // if(this.character.isHurt()){

  //this.character.hurt=true}else{
  //hurt=false;

  //}

  //characterDead() {
  //  this.character
  //   .animate()
  //  .this.character.playAnimation(this.character.IMGS_DIE);
  //}

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, this.camera_y);
    //this.addToMap(this.bg);

    this.forEachToMap(this.level.backgrounds);
    this.forEachToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, this.camera_y);
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.weaponbar);
    //this.weaponbar.drawBall(this.ctx);
    if (this.character.isGameover() || this.level.endboss.isGameover()) {
      console.log("Endscreen");
      this.addToMap(this.endscreen);
    }
    this.ctx.fillStyle="yellow";
    this.ctx.fillText(this.coinbar.allcoins,230,35)
    this.ctx.fillStyle="gray";
    this.ctx.fillText(this.weaponbar.allbombs,320,35)
    this.ctx.translate(this.camera_x, this.camera_y);
    this.forEachToMap(this.level.bombs);
    this.forEachToMap(this.level.coins);
    this.addToMap(this.character);
    this.forEachToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    //if (this.character.ball) {
     // this.addToMap(this.character.ball);
    //}
    if (this.character.balls) {
      this.forEachToMap(this.character.balls);
    }
    if (this.level.endboss.weapon) {
      this.addToMap(this.level.endboss.weapon);
    }
    
    this.ctx.translate(-this.camera_x, this.camera_y);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  forEachToMap(array) {
    array.forEach((e) => {
      this.addToMap(e);
    });
  }

  addToMap(emt) {
    if (emt.otherDirection == true) {
      emt.flipImg(this.ctx);
    }
    emt.drawObj(this.ctx);
    emt.drawFrame(this.ctx);
    if (emt.otherDirection == true) {
      emt.flipImgBack(this.ctx);
    }
  }

  /*writeWeaponbar() {
    setInterval(() => {
      this.weaponbar.setPercentage();
    }, 1000 / 60);
  }*/

  /*writeCoinbar() {
    setInterval(() => {
      this.coinbar.setPercentage();
    }, 1000 / 60);
  }*/


  writeStatusbar() {
    setInterval(() => {
      this.statusbar.persentage = this.character.energy;
      this.statusbar.setPercentage();
    }, 1000 / 60);
  }

  countCoins() {
    this.coinbar.allcoins += 1;
  }

  countBombs() {
    this.weaponbar.allbombs += 1;
  }

  showStartscreen() {
    window.location.href = "../index.html";
  }

  pauseGame(){
    setInterval(()=>{if(this.play==false){
      this.character.play=false;
      this.level.enemies.forEach((enemy)=>{
        enemy.play=false;
      })
      
      this.level.endboss.play=false;
  }else{
    this.character.play=true;
    this.level.enemies.forEach((enemy)=>{
      enemy.play=true;
    })
    this.level.endboss.play=true;
  }},1000/60)
    
  }

  setPlay(){
    setInterval(()=>{
if(this.keyboard.PAUSE==true){
  this.play=false;
}else{
  this.play=true;
}
    },1000/60)
  }
}
