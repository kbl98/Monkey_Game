class Coin extends MoveableObject {
  width = 80;
  height = 80;
  sound = new Audio("../audio/collect.mp3");


  constructor(x, y) {
    super().loadImg("../img/img 4/8_coin/coin_1.png");
    this.x = x;
    this.y = y;
    this.animate();
  }

  removeCoin() {
    this.y = 6000;
  }

  animate(){
    setInterval(()=>{
      this.width=this.width + Math.random()*1 - Math.random()*1;
    },1000/10)
  }
}
