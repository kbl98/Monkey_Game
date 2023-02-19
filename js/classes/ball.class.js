class Ball extends MoveableObject{
    height=50;
    width=50;
    speed=10;
    speedY=20;
    world;
    play=true
    constructor(character){
        
        super().loadImg("../img/craftpix-891176-battle-of-heroes-2d-game-kit/Png/Projectile/4.png");
        this.x=character.x + 40;
        this.y=character.y + 50;
        this.aplyGravity()
        this.throw();
        this.otherDirection=character.otherDirection
    }


    throw(){
        setInterval(()=>{
            if(this.play==true){
            if(this.otherDirection==false){
                this.x+=this.speed;
            }else{
                this.x-=this.speed;
            }
    }},1000/30)
    }

    
}