//Declared variables for stats and images
let stats = document.querySelector('.playerStats');
let enemyStats = document.querySelector('.enemyStats');
let playerImg = document.querySelector('.playerImage');
let enemyImg = document.querySelector('.enemyImage');

//Ship class that creates new ships for Player and Enemies

class Ship {
    constructor (hull, firepower, accuracy){
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }
}

// Initializing an instance for Spaceship
let spaceship = new Ship (20, 5, .7);

let spaceShipName = document.querySelector('#player1Name').innerHTML = "USS HelloWorld";


//Function creates a random number of enemies with random stats

function genereateEnemy(number){
    while (number > 0){
        const enemyShip = new Ship (integer(3, 6), integer(2, 4), decimal());
        enemies.unshift(enemyShip);
        number--;
    }
}

//Creating an array to push enemies into when calling generate enemy function and creating a copy of the array to be able to receive halfNumOfEnemies of the length of the array

let enemies = [];
genereateEnemy(integer(4, 8));

//Grabbing the values for the upgrade feature

let totalEnemies = [...enemies];
let halfNumOfEnemies = Math.floor(totalEnemies.length/2);

//enemyUpdate function to update the html to the correct enemy we are facing before the page loads

enemyUpdate(enemies[0]);

// Initial prompt when starting game for the first time

setTimeout(() => {
    let startMessage = window.confirm("Welcome to Space battleStart!");
    if (startMessage) {
        startGame();
    }
  }, 3000)

// Function that will start the game and give dialouge to the player

function startGame () {

    alert("The fate of the Earth is in your hands...");
    enemyImg.style.backgroundImage = "url('/images/enemy.gif')";

// Starts battleStart flow of events

    setTimeout(() => {
        if (confirm('Do you want to attack?')) {
            battleStart(enemies); 

// Else player chooses not to enter the battle.
        }else {
            alert('So much for being Earths only defense!?...');
            alert(`The abandoned the battle!`);
            replay();
        }   
    }, '500');
}

// BattleStart function set to enemies 0 due to our use of shift and unshift

function battleStart(enemies) {
    ourAttack(enemies[0]);
}

//Function to for situations that could happen after the initial run of the battleStart function

function newBattle () {

    //Creating an upgrade

    if (enemies.length === halfNumOfEnemies){
        setTimeout(() => {
        alert("Captain: The aliens seem to be planning a large attack, we have time to install an upgrade to the ship while they plan... but we only have time for one... Its up to you soldier will you recharge your shields or upgrade your firepower?")
            if (confirm('Hit OK to return to 20 HP, and CANCEL to increase your FIREPOWER by 2')){
                spaceship.hull = 20;
                updateStats();
            } else {
                spaceship.firepower = 7;
                updateStats();
            }   
        }, '500')
        
        setTimeout(() => {
            alert(`The ${spaceShipName} has been repaired. Please, return to the battle!`);
        }, '700');
    }

// Checks if enemies are still alive. If so, continue or retreat.

    if (enemies.length != 0) {
        enemyUpdate(enemies[0]);
        setTimeout(() => {
            if (confirm(`The fight is not over yet! There are still ${enemies.length} enemies remaining. Will the ${spaceShipName} continue with attacking or retreat?`)) {
            enemyImg.style.backgroundImage ="url('/images/enemy.gif')";
                setTimeout(() => {
                    alert(`Let's continue our assualt`);
                    battleStart(enemies) //Beginning the battleStart sequence again on new enemy0
                }, '500');
            } else {
                alert(`The decided to retreat.. and have doomed Earth to fight without you...`);
                alert(`The ${spaceShipName} Loses!`);
                replay();
            }
        }, '800')
    } else {
        enemyImg.style.backgroundImage ='';
        setTimeout(() => {
        alert("No more enemies remain!");
        alert(`The ${spaceShipName} has defeated all the space invdaders and will return to Earth as a hero!`);
        alert(`The ${spaceShipName} Wins!`);
        replay();
        }, '500');
    }
}

// Player's attack function

function ourAttack (invader) {
    if(Math.random() < spaceship.accuracy){
        invader.hull -= spaceship.firepower;
        enemyUpdate(invader); 
// Checks if the enemy is defeated with the attack        
        if (invader.hull <= 0) {
            invader.hull = 0;
            enemyUpdate(invader);
            enemyImg.classList.add('shake');
                setTimeout(() => {
                    alert(`Direct hit. ${spaceShipName} dealt ${spaceship.firepower} damage. The ${spaceShipName} has destroyed the enemy!`)
                        enemies.shift();
                        enemyImg.style.backgroundImage ='';
                        newBattle();
                }, '800');
            setTimeout(() => enemyImg.classList.remove('shake'), '750');
        }  else {

// Checks, if the enemy survives the attack
            enemyImg.classList.add('shake');
                setTimeout (() => {
                    alert(`Direct hit, the ${spaceShipName} has dealt ${spaceship.firepower} damage!`);
                    enemyAttack(invader);
            }, '800')
            setTimeout(() => enemyImg.classList.remove('shake'), '750');
        }

//Missed attack is handled here.
} else {
        setTimeout (() => {
            alert(`The ${spaceShipName} missed!`);
            enemyAttack(invader);
        }, '800');
    }
}

// Enemy's attack function
function enemyAttack (invader) {
    if (Math.random() < invader.accuracy) {
        spaceship.hull -= invader.firepower;
        updateStats();
//code for if enemy defeats the player
        if (spaceship.hull <= 0) {
            spaceship.hull = 0;
            updateStats();
            playerImg.classList.add('shake')
            setTimeout(() => {
                alert(`Direct hit, enemy dealt ${invader.firepower} damage to the ${spaceShipName}'s shields!`);
                alert(`The ${spaceShipName}'s shields are fully depleted..`);
                alert(`The ${spaceShipName} Loses!`);
                replay();
            }, '800')
            setTimeout(() => playerImg.classList.remove('shake'), '750');
//code for if player survives hit
            }else {
                playerImg.classList.add('shake');
                setTimeout (() => {
                    alert(`Direct hit, enemy dealt ${invader.firepower} damage to the ${spaceShipName}'s shields!`);
                    ourAttack(invader);
                }, '800')
        setTimeout(() => playerImg.classList.remove('shake'), '750');
            }
// Else for if enemy misses
    } else {
        setTimeout (() => {
            alert('Enemy missed!');
            ourAttack(invader);
        }, '800');
    }
}

// Function to update enemy stats

function enemyUpdate (invader) {
    enemyStats.innerHTML = `Hull: ${invader.hull}<br> Firepower: ${invader.firepower}<br> Accuracy: ${Math.round(10*invader.accuracy)/10}<br>`;
}

// Function to update player stats

function updateStats () {
    stats.innerHTML = `Hull: ${spaceship.hull}<br> Firepower: ${spaceship.firepower}<br> Accuracy: ${spaceship.accuracy}<br>`
}

//Random integer generated for health and firepower properties

function integer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random decimal for firepower

function decimal() {
    return Math.random() * (.8 - .6) + .6;
}

// Replay function that checks when the player wins or loses and wants to play again.

function replay() {
    if (confirm('Would you like to try to defend earth again?')){
        location.reload()
    } else {
        alert('Thanks for playing we hope you enjoyed! Your window will now close.')
        window.close() 
    }
}