class Level{
    enemies;
    backgrounds;
    clouds;
    endboss;
    coins;
    bombs;
    level_end=7000;
    level_imgs;

    constructor(clouds,backgrounds,enemies,endboss,coins,bombs){
        this.enemies=enemies;
        this.backgrounds=backgrounds;
        this.clouds=clouds;
        this.endboss=endboss;
        this.coins=coins;
        this.bombs=bombs;
    }

}