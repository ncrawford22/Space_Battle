class Player {
    constructor() {
        this.name = "USS HelloWorld";
        this.hull = 20;
        this.accuracy = 0.7;
        this.firepower = 5;
        this.isLiving = true;
    }
    attackP(enemy) {
        if (Math.random() <= players[0].accuracy) {
                console.log('You hit the enemy!');
                enemy.hull = enemy.hull - this.firepower;

                    if (enemy.hull <= 0) {

                        enemy.isAlive = false;
                        console.log(enemy.name + ' is dead!');
                    } 
            } else {
                console.log('You missed!');
        }
            
    }
}

class Enemy {
    constructor(name) {
        this.name = name;
        this.hull = Math.floor(Math.random() * 4) + 3;
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
        this.isLiving = true;
    }
    attackE(player) {
        if (this.name === enemies[0].name) {
            if (Math.random() <= enemies[0].accuracy) {

                console.log(this.name + " hit you!");
                player.hull = player.hull - this.firepower;

                if (player.hull <= 0) {

                    player.isAlive = false;
                    console.log(player.name + ' is dead!');
                } 

            } else {
                console.log('Your turn!');
            }
            
        }
    }
}

let player1 = new Player();

// console.log(player1);


let enemy1 = new Enemy("Enemy 1");
let enemy2 = new Enemy("Enemy 2");
let enemy3 = new Enemy("Enemy 3");
let enemy4 = new Enemy("Enemy 4");
let enemy5 = new Enemy("Enemy 5");
let enemy6 = new Enemy("Enemy 6");

let players = [player1]

let enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// console.log(enemies)

// console.log(enemy1);
// console.log(enemy2);
// console.log(enemy3);
// console.log(enemy4);
// console.log(enemy5);
// console.log(enemy6);

player1.attackP(enemy1);