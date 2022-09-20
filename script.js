// Set up the enemy using (class)

class Enemy {
  constructor(name) {
    this.name = name;
    this.hull = Math.floor(Math.random() * 4) + 3;
    this.firepower = Math.floor(Math.random() * 3) + 2;
    this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10;
    this.isAlive = true;
  }

  // Enemy's method of attacking the Player

  attackPlayer(player) {
    if (Math.random() <= this.accuracy) {
      console.log("You have been hit!");
      player.hull = player.hull - this.firepower;
      if (player.hull <= 0) {
        player.isAlive = false;
        alert(player.name + " is dead");
        console.log(player.name + " is dead");
        resetButton.style.display = "flex";
      }
    } else {
      alert(`${player.name} escaped`);
      console.log(`${player.name} escaped`);
    }
  }
}

// Set up the player class using (class)
class Player {
  constructor() {
    this.name = "USS HelloWorld";
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.isAlive = true;
  }
  // Player's method of attacking the Enemy
  attackEnemy(enemy) {
    if (Math.random() <= this.accuracy) {
      alert("You hit the enemy!");
      console.log("You hit the enemy!");
      enemy.hull = enemy.hull - this.firepower;
      if (enemy.hull <= 0) {
        enemy.isAlive = false;
        alert(enemy.name + " is dead");
        console.log(enemy.name + " is dead");
        resetButton.style.display = "flex";
      }
    } else {
      alert("You missed!");
      console.log("You missed!");
    }
  }
}

// initializing instance variables

// Setting value of mainPlayer variable to player parameter
let mainPlayer = new Player();

//Building an Array for enemies
let enemies = [
  new Enemy("enemy1"),
  new Enemy("enemy2"), 
  new Enemy("enemy3"), 
  new Enemy("enemy4"), 
  new Enemy("enemy5"), 
  new Enemy("enemy6")
];

let mainEnemy = findNextAliveEnemy(enemies);

updatePlayerStatusInDom(mainPlayer);
updateEnemyStatusInDom(mainEnemy);


let startBattleButton = document.getElementById("start");
startBattleButton.addEventListener("click", (event) => {
  startBattle();
});

let resetButton = document.getElementById('reset');
resetButton.addEventListener("click", replay);

//The function was creating for the battle
function startBattle() {
  console.log(`You're battling ${mainEnemy.name}`);
  alert(`You're battling ${mainEnemy.name}`);
  mainPlayer.attackEnemy(mainEnemy);
  updateEnemyStatusInDom(mainEnemy);
  //Check if/While nemy is living...
  if (mainEnemy.isAlive) {
    // The enemy survived the attack
    console.log(`${mainEnemy.name} survived the attack! Prepare for the counter attack!`);
    alert(`${mainEnemy.name} survived the attack! Prepare for the counter attack!`);

    // The enemy attacks the main player
    mainEnemy.attackPlayer(mainPlayer);
    updatePlayerStatusInDom(mainPlayer);
    startBattleButton.innerText = "Next Turn"
  } else {
    // Get next enemy
    let newEnemy = findNextAliveEnemy(enemies);

    // No new enemy found
    if (!newEnemy) {
      console.log("All enemies are DEAD! You WIN");
      alert("All enemies are DEAD! You WIN");
      startBattleButton.innerText = "YOU WON";
      startBattleButton.disabled = true;
      resetButton.style.display = "flex";
      return;
    }

    // Declaring "retreat" variable and settings it's value to a prompt message
    let retreat = prompt(
      `${mainEnemy.name} is dead, but a new enemy lies ahead!! Would you like to retreat? (Yes or No)`
    );

    // Condition that sets when game is over if "yes" is entered into the promot. Otherwise, battle continues.
    if (retreat.toLowerCase() === "yes") {
      console.log("GAME OVER!");
      alert("GAME OVER!");
      startBattleButton.innerText = "GAME OVER";
      startBattleButton.disabled = true;
      resetButton.style.display = "flex";
      return; // Ends game
    } else {
      mainEnemy = newEnemy;
      startBattleButton.innerText = "Next Turn"
      updatePlayerStatusInDom(mainPlayer);
      updateEnemyStatusInDom(mainEnemy);
    }
  }
}

function updatePlayerStatusInDom(player) {
  const playerDiv = document.getElementById("playerStats")
  playerDiv.innerHTML = `
  Hull : ${player.hull}  <br>
  FirePower : ${player.firepower} <br>
  Accuracy : ${player.accuracy} <br>`
}

function updateEnemyStatusInDom(enemy) {
  const enemyDiv = document.getElementById("enemyStats")
  enemyDiv.innerHTML = `
  Hull : ${enemy.hull}  <br>
  FirePower : ${enemy.firepower} <br>
  Accuracy : ${enemy.accuracy} <br>`
}

function findNextAliveEnemy(enemies) {
  // Searching array of enemies for enemies that still return true for "isAlive"
  return enemies.find((enemy) => enemy.isAlive); 
}

function replay() {
  if (confirm('Would you like to try to defend earth again?')){
      location.reload()
  } else {
      alert('Thanks for playing we hope you enjoyed! Your window will now close.')
      window.close() 
  }
}