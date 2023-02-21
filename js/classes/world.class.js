class World {
  camera_x = 0;
  camera_y = 0;
  character = new Character();
  level = level_1;
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
  play = true;
  audio = true;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "200 20px DripOctober-vm0JA";
    this.ctx.fillStyle = "green";
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.runGame();
    this.writeStatusbar();
    this.pauseGame();
    this.setPlay();
    this.setAudio();
  }

  setWorld() {
    this.character.world = this;
  }

  runGame() {
    setInterval(() => {
      if (this.play == true) {
        this.checkCollision();
      }
    }, 1000 / 60);
  }

  checkCollision() {
    this.checkCollectCoins();
    this.checkCollectBombs();
    this.checkCollisionEnemy();
    this.checkCollisionBalls(this.level.endboss);
    this.checkCollisionEndboss();
  }

  checkCollectCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.countCoins();
        coin.sound.play();
        coin.removeCoin();
      }
    });
  }

  checkCollectBombs() {
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
  }

  checkCollisionEnemy() {
    this.level.enemies.forEach((enemy) => {
      this.checkCollisionBalls(enemy);
      if (this.character.isColliding(enemy)) {
        if (this.fromAbove(enemy)) {
          enemy.enemyIsHit();
          this.character.y = 100;
        } else if (!this.character.isHurt()) {
          this.characterIsHit();
        }
      }
    });
  }

  checkCollisionBalls(enemy) {
    this.character.balls.forEach((ball) => {
      if (this.character.balls) {
        if (ball.isColliding(enemy) && !enemy.isHurt()) {
          ball.bounce();
          enemy.enemyIsHit();
        }
      }
    });
  }

  checkCollisionEndboss() {
    if (
      this.character.isColliding(this.level.endboss) ||
      this.character.isColliding(this.level.endboss.weapon)
    ) {
      if (!this.character.isHurt()) {
        this.characterIsHit();
      }
    }
  }

  characterIsHit() {
    this.character.hit();
    this.character.sound_hurt.play();
    this.character.checkDeath();
  }

  fromAbove(enemy) {
    if (this.character.speedY < 0 && this.character.y + 50 < enemy.y) {
      return true;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, this.camera_y);
    this.forEachToMap(this.level.backgrounds);
    this.forEachToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, this.camera_y);
    this.drawStatic();
    this.ctx.translate(this.camera_x, this.camera_y);
    this.forEachToMap(this.level.bombs);
    this.forEachToMap(this.level.coins);
    this.forEachToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    if (this.character.balls) {
      this.forEachToMap(this.character.balls);
    }
    if (this.level.endboss.weapon) {
      this.addToMap(this.level.endboss.weapon);
    }
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, this.camera_y);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawStatic() {
    this.addToMap(this.statusbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.weaponbar);
    if (this.character.isGameover() || this.level.endboss.isGameover()) {
      this.addToMap(this.endscreen);
    }
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.coinbar.allcoins, 230, 35);
    this.ctx.fillStyle = "gray";
    this.ctx.fillText(this.weaponbar.allbombs, 320, 35);
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
    //emt.drawFrame(this.ctx);
    if (emt.otherDirection == true) {
      emt.flipImgBack(this.ctx);
    }
  }

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
    window.location.href = "index.html";
  }

  pauseGame() {
    setInterval(() => {
      if (this.play == false) {
        this.pauseAudio();
        this.character.pauseMoves();
        this.level.enemies.forEach((enemy) => {
          enemy.pauseMoves();
        });
        this.level.endboss.pauseMoves();
      } else {
        this.playAudio();
        this.character.moveObj();
        this.level.enemies.forEach((enemy) => {
          enemy.moveObj();
        });
        this.level.endboss.moveObj();
      }
    }, 1000 / 60);
  }

  setPlay() {
    setInterval(() => {
      if (this.keyboard.PAUSE == true) {
        this.play = false;
      } else {
        this.play = true;
      }
    }, 1000 / 60);
  }

  pauseAudio() {
    this.character.sound_birds.pause();
  }

  playAudio() {
    this.character.sound_birds.play();
  }

  setAudio() {
    setInterval(() => {
      if (this.keyboard.AUDIO == false) {
        this.audio = false;
      } else {
        this.audio = true;
      }
      this.muteAudio();
    }, 1000 / 60);
  }

  muteAudio() {
    if (this.audio == false) {
      this.character.sound_birds.volume = 0;
      this.character.sound_jump.volume = 0;
      this.character.sound_hurt.volume = 0;
      this.character.sound_die.volume = 0;
      this.character.sound_throw.volume = 0;
      this.character.sound_collect_weapon.volume = 0;
      this.character.sound_walk.volume = 0;
      this.character.sound_win.volume = 0;
      this.level.endboss.sound_hit.volume = 0;
      this.level.coins.forEach((c) => (c.sound.volume = 0));
      this.level.enemies.forEach((e) => (e.sound_hit.volume = 0));
    } else {
      this.character.sound_birds.volume = 1;
      this.character.sound_jump.volume = 1;
      this.character.sound_hurt.volume = 1;
      this.character.sound_die.volume = 1;
      this.character.sound_throw.volume = 1;
      this.character.sound_collect_weapon.volume = 1;
      this.character.sound_walk.volume = 1;
      this.character.sound_win.volume = 1;
      this.level.endboss.sound_hit.volume = 1;
      this.level.coins.forEach((c) => (c.sound.volume = 1));
      this.level.enemies.forEach((e) => (e.sound_hit.volume = 1));
    }
  }
}
