// Write your JS here

const hero = {
  name: 'Voske',
  heroic: true,
  inventory: [],
  health: 10,
  weapon: {
    type: 'defensive humor',
    damage: 2
  }
};

const rest = (object) => {
  object.health = 10;

  // Stats on screen are updated
  displayStats(object);

  return object;
};

// Assignment is unclear on this function, assignment says add weapon object to end of inventory array. I initially interpreted this as the hero's weapon. However, what is meant is add the item to be picked up (argument of function) to the end of the array. Further on, this does turn out to be a weapon, but it does not have to be.
const pickUpItem = (someHero, itemToPickUp) => {
  someHero.inventory.push(itemToPickUp);

  // Stats on screen are updated
  displayStats(someHero);
};

const equipWeapon = (someHero) => {
  // If inventory has no entries, or the first entry is an empty object, then this function should do nothing.
  // Inverse: if inventory does NOT have 0 entries AND first entry is NOT an ampty object, function should be executed. The hero is equipped with the first item from its inventory.
  if (someHero.inventory.length !== 0 && someHero.inventory[0] !== {}) {
    someHero.weapon = someHero.inventory[0];
  }

 // Stats on screen are updated
  displayStats(someHero);
};

//Weapon to be picked up by hero
const dagger = {
  type: 'dagger',
  damage: 2
};

//Display hero's name, health, weapon type and weapon damage to the screen.
const displayStats = (heroYouWantToDisplay) => {

  //Get the td elements from the DOM.
  const heroName = document.getElementById('hero-name');
  const heroHealth = document.getElementById('hero-health');
  const heroWeapon = document.getElementById('hero-weapon');

  //Update the DOM
  heroName.innerHTML = heroYouWantToDisplay.name;
  heroHealth.innerHTML = `${heroYouWantToDisplay.health} HP`;
  heroWeapon.innerHTML = `My trusted ${heroYouWantToDisplay.weapon.type} with damage ${heroYouWantToDisplay.weapon.damage}`;
};

displayStats(hero);


//For my own game:
//The new hero object. I also added a location on the grid:

const heroGame = {
  name: 'Voske',
  heroic: true,
  inventory: [],
  health: 10,
  weapon: {
    type: 'Bare fists',
    damage: 1
  },
  location: [4,4]
};

//Enemy object:
const enemyGame1 = {
  health: 20,
  weapon: {
    type: 'Paws',
    damage: 1
  },
  location: [0,0]
};

const enemyGame2 = {
  health: 5,
  weapon: {
    type: 'Sword of Legends',
    damage: 4
  },
  location: [8,8]
};

// I only have the enemies in objects above for readability. When the page loads I load all enemies in a set of enemies (an array) which is what I will use during the game.
const allEnemies = [];
allEnemies.push(enemyGame1);
allEnemies.push(enemyGame2);

//Function which moves the enemy into a random direction:
const moveEnemy = (arrayOfEnemiesToMove) => {

 for(let i=0;  i<arrayOfEnemiesToMove.length; i++) {

   //Randomize if enemy moves left(0), right (1), up (2) or down (3)
   const directionOfMovement = Math.floor(Math.random()*4);

   //Update the location, if enemy moves outside of playing field, move in the oposite direction instead.
   switch(directionOfMovement) {
     //Move left if possible, right if not
     case 0:
      if (arrayOfEnemiesToMove[i].location[0]===0) {
        arrayOfEnemiesToMove[i].location[0]= 1
      } else {
        arrayOfEnemiesToMove[i].location[0] -= 1;
      }
      break;
    //Move right if possible, left if not
    case 1:
      if (arrayOfEnemiesToMove[i].location[0]===8) {
        arrayOfEnemiesToMove[i].location[0]= 7
      } else {
        arrayOfEnemiesToMove[i].location[0] += 1;
      }
      break;
      //Move up if possible, down if not
      case 2:
       if (arrayOfEnemiesToMove[i].location[1]===0) {
         arrayOfEnemiesToMove[i].location[1]= 1
       } else {
         arrayOfEnemiesToMove[i].location[1] -= 1;
       }
       break;
     //Move down if possible, up if not
     case 3:
       if (arrayOfEnemiesToMove[i].location[1]===8) {
         arrayOfEnemiesToMove[i].location[1]= 7
       } else {
         arrayOfEnemiesToMove[i].location[1] += 1;
       }
       break;
     }
   }
   console.log(`Enemy 1 is located at ${arrayOfEnemiesToMove[0].location}`);
   console.log(`Enemy 2 is located at ${arrayOfEnemiesToMove[1].location}`);
};

//Function which processes the player move:
const moveHero = (heroToMove) => {

};

//Function to update the playing field. Will be called after every press of an arrow key.
const updatePlayingField = () => {

};

moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
moveEnemy(allEnemies);
