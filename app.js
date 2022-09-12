const w = () => {
    if (enemies[5].hull <= 0) { // Checks if NO(!) enemies are returning isLiving === true
        setTimeout(() => {alert("All enemies have been DEFEATED! You win!")}, '700');
        console.log("All enemies have been DEFEATED! You win!");
    }
}

const l = player1 => {
    if (player1.hull <= 0) {
        player1.isLiving = false;
        setTimeout(() => {alert(player1.name + ' is dead! You lose!')}, '700');
        console.log(player1.name + ' is dead! You lose!');
    } 
}

// playerStats and enemyStats are pulled from index.html to use for updating stats as game progresses.
let playerStats = document.querySelector(".playerStats");
let enemyStats = document.querySelector(".enemyStats");
let enemyName = document.querySelector(".mainCharacterView right.namebox")

// Setup Player class
class Player {
    constructor() {
        this.name = "USS HelloWorld";
        this.hull = 20;
        this.accuracy = 0.7;
        this.firepower = 5;
        this.isLiving = true;
    }
    attackEnemy(enemy) { // Player method for attacking the enemy
        if (Math.random() <= this.accuracy) {
            setTimeout(() => {alert('You hit the enemy!')}, '700');
                console.log('You hit the enemy!');
                enemy.hull = enemy.hull - this.firepower;

                updateAlien();

                    if (enemy.hull <= 0) {

                        enemy.isLiving = false;
                        setTimeout(() => {alert(enemy.name + ' is dead!')}, '700');
                        console.log(enemy.name + ' is dead!');
                    } 
            } else {
                setTimeout(() => {alert('You missed ' + enemy.name + '!')}, '700');
                console.log('You missed ' + enemy.name + '!');
            }
            
        }
    }

// Setup the Enemy Class
class Enemy {
    constructor(name) {
        this.name = name;
        this.hull = Math.floor(Math.random() * 4) + 3;
        this.firepower = Math.floor(Math.random() * 3) + 2;
        this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
        this.isLiving = true;
    }
    attackPlayer(player) { // Enemy method for attacking the player
            if (Math.random() <= this.accuracy) {

                setTimeout(() => {alert(this.name + " hit you!")}, '700');
                console.log(this.name + " hit you!");
                player.hull = player.hull - this.firepower;

                updatePlayer();

                // if (player.hull <= 0) {

                //     player.isLiving = false;
                //     alert(player.name + ' is dead! You lose!');
                //     console.log(player.name + ' is dead! You lose!');
                // } 

            } else {
                setTimeout(() => {alert(this.name + ' missed!')}, '700');
                console.log(this.name + ' missed!');

            }
            
        }
    }

// Initialize instance for single player
let player1 = new Player();

// Initialize instances for enemy ships
let enemy1 = new Enemy("Enemy 1");
let enemy2 = new Enemy("Enemy 2");
let enemy3 = new Enemy("Enemy 3");
let enemy4 = new Enemy("Enemy 4");
let enemy5 = new Enemy("Enemy 5");
let enemy6 = new Enemy("Enemy 6");

// Establish enemy ship array 
let enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// console.log(enemies) //Log enemies array to display data

// Log each enemy to observe if data is better randomized
// console.log(enemy1);
// console.log(enemy2);
// console.log(enemy3);
// console.log(enemy4);
// console.log(enemy5);
// console.log(enemy6);

// Testing the Player attack method
// player1.attackEnemy(enemy1);

// Testing the Enemy attack method
// enemy1.attackPlayer(player1);

//Declare variables, mainPlayer & enemy for use in startBattle function
let mainPlayer;
let enemy;

// Established function to initiate and control the flow of the battle. 
// While (living) continue to fight Unless "no" is entered into the prompt
function startBattle(player, enemies) {
    mainPlayer = player; // Set value of mainPlayer variable to player parameter

    while (player.isLiving) { // Checking if/while Player is living...
        enemy = enemies.find((enemy) => enemy.isLiving); // Searching through array of enimies for enemies that still return true for "isLiving"

        // if (enemies[5].hull <= 0) { // Checks if NO(!) enemies are returning isLiving === true
        //     alert("All enemies have been DEFEATED! You win!");
        //     console.log("All enemies have been DEFEATED! You win!");
        //     break;
        // }

        setTimeout(() => {alert(`You are battling ${enemy.name}!`)}, '700');
        console.log(`You are battling ${enemy.name}!`);
        player1.attackEnemy(enemy); // Player attacks Enemy
        updateAlien();

        if (enemy.isLiving === 'true') { // Checks if/while enemy is living...
            enemy.attackPlayer(player); // Continue the attack on the Player
            updatePlayer();
        } else {
            // Declaring "retreat" variable and settings it's value to a prompt message
            let newEnemy = enemies.find((enemy) => enemy.isAlive); // Searching array of enimies for enemies that still return true for "isAlive"
            if (newEnemy) {
              let retreat = prompt(
                `${enemy.name} is dead, would you like to retreat? (Yes or No)`
              );
      
              if (retreat.toLowerCase() === "yes") {
                // Condition that sets when game is over if "yes" is entered into the promot. Otherwise, battle continues.
                setTimeout(() => {alert("GAME OVER!")}, '700');
                console.log("GAME OVER!");
                break; // Ends game
                }

            }
        }
    }

}


// Functions used to update stats
function updatePlayer() {
    playerStats.innerHTML = `Hull: ${player1.hull} <br> Firepower: ${player1.firepower} <br> Accuracy: ${player1.accuracy}`;
}
function updateAlien() {

    enemyStats.innerHTML = `Hull: ${enemies[0].hull} <br> Firepower: ${enemies[0].firepower} <br> Accuracy: ${enemies[0].accuracy}`;
}

setTimeout(() => {
    let startMessage = window.confirm("Welcome to Space Battle!");
    if (startMessage) {
        startBattle(player1, enemies);
    }
  }, 3000); // 3 second delay before the battle starts.
