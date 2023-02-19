class EndbossWeapon extends MoveableObject{

    height=50;
    width=50;
    speed=25;
    speedY=10;
    world;
    play=true;
    constructor(character){
        
        super().loadImg("../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Projectile/1.png");
        this.x=this. getX(character);
        this.y=character.y + 120;
        this.aplyGravityWeapon()
        this.throw();
        this.otherDirection= this.getOtherDirection(character)
    }


    throw(){
       setInterval(()=>{
            if(this.play==true){
            if(this.otherDirection==false){
                this.x+=this.speed;
            }else{
                this.x-=this.speed;
            }
    }
},1000/40)
    }

    aplyGravityWeapon() {
        setInterval(() => {
         //if (this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
          //}
        }, 1000 / 40);
      }

     getOtherDirection(character){
        if(character.otherDirection){
             return false
        }else{
            return true
        }
    }

    getX(character){
        if(this.otherDirection){
            return character.x + 10;
        }else{
            return character.x +130;
        }
    }

}