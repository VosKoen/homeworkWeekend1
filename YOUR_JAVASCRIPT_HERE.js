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
  //displayStats(object);

  return object;
};

// Assignment is unclear on this function, assignment says add weapon object to end of inventory array. I initially interpreted this as the hero's weapon. However, what is meant is add the item to be picked up (argument of function) to the end of the array. Further on, this does turn out to be a weapon, but it does not have to be.
const pickUpItem = (someHero, itemToPickUp) => {
  someHero.inventory.push(itemToPickUp);

  // Stats on screen are updated
  //displayStats(someHero);
};

const equipWeapon = (someHero) => {
  // If inventory has no entries, or the first entry is an empty object, then this function should do nothing.
  // Inverse: if inventory does NOT have 0 entries AND first entry is NOT an ampty object, function should be executed. The hero is equipped with the first item from its inventory.
  if (someHero.inventory.length !== 0 && someHero.inventory[0] !== {}) {
    someHero.weapon = someHero.inventory[0];
  }

 // Stats on screen are updated
  //displayStats(someHero);
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
    type: 'bare fists',
    damage: 1
  },
  location: [4,4],
  imgSource: "images/hero.jpeg",
  isAlive: true
};

//Enemy object:
const enemyGame1 = {
  health: 20,
  weapon: {
    type: 'Paws',
    damage: 1
  },
  location: [0,0],
  isAlive: true,
  imgSource: "images/enemy1.jpg"
};

const enemyGame2 = {
  health: 5,
  weapon: {
    type: 'Sword of Legends',
    damage: 4
  },
  location: [8,8],
  isAlive: true,
  imgSource: "images/enemy2.png"
};

const daggerGame = {
  type: 'dagger',
  damage: 2,
  location: [3,1],
  isOnMap: true,
  imgSource: "images/dagger.jpg"
};

const innGame = {
  location: [8,6],
  imgSource: "images/inn.jpeg"
};

const fightLocation = {
  location: [],
  imgSource:'images/swords.png'
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
};

//Function which processes the player move:
const moveHero = (heroToMove, key) => {
  if(key === 'ArrowUp') {
    if(heroToMove.location[0] !==0) {
      heroToMove.location[0] -= 1;
    }
  } else if(key === 'ArrowDown') {
    if(heroToMove.location[0] !== 8) {
      heroToMove.location[0] += 1;
    }
  } else if(key === 'ArrowLeft') {
    if(heroToMove.location[1] !== 0) {
      heroToMove.location[1] -= 1;
    }
  } else if(key === 'ArrowRight') {
    if(heroToMove.location[1] !== 8) {
      heroToMove.location[1] += 1;
    }
  }
};

//Function to update the playing field. Will be called after every press of an arrow key.
const updatePlayingField = (hero, arrayOfEnemies, inn, item, key) => {
  //Only update the playing field if the game is ongoing, if not, do nothing
  if((gameIsPlaying)&&(hero.isAlive)) {

    //First we move hero and allEnemies
    moveHero(hero, key);
    moveEnemy(arrayOfEnemies);

    //Is there an inn?
    if(hero.location[0] === inn.location[0] && hero.location[1] === inn.location[1]) {
      rest(hero);
    }

    //Is there an item?
    if((hero.location[0] === item.location[0] && hero.location[1] === item.location[1]) && (item.isOnMap)) {

      pickUpItem(hero,item);
      //Afraid to break tests, I would place the following line in pickUpItem, however, I do not want to break the automated tests.
      item.isOnMap = false;
      equipWeapon(hero);
    }

    //Is there an enemy?
    for(let i=0;i<arrayOfEnemies.length;i++) {
      if((hero.location[0] === arrayOfEnemies[i].location[0] && hero.location[1] === arrayOfEnemies[i].location[1]) && (arrayOfEnemies[i].isAlive)) {
        //We fight!
        hero.health -= arrayOfEnemies[i].weapon.damage;
        arrayOfEnemies[i].health -= hero.weapon.damage;
      }
      if(arrayOfEnemies[i].health <= 0) {
        arrayOfEnemies[i].isAlive = false
      }
      if(hero.health <= 0) {
        hero.isAlive = false;
        window.alert('You died!');
      }
    }


    //Are we still alive?

    //Empty all innerHTML of all elements in playing field.
    for(let i=0; i<=8; i++) {
      for(let j=0; j<=8; j++) {
        const playingFieldCell = document.getElementById('cell-'+i+'-'+j);
        playingFieldCell.innerHTML = '';
      }
    }


    //Write new status to the DOM

    drawPlayElement(inn);
    if(item.isOnMap) {
      drawPlayElement(item);
    }
    if(hero.isAlive) {
    drawPlayElement(hero);
    }

    for(let i=0;i<arrayOfEnemies.length;i++) {
      if(arrayOfEnemies[i].isAlive) {
        drawPlayElement(arrayOfEnemies[i]);

        //If hero is on location of enemy, we draw a battle symbol.
        if(arrayOfEnemies[i].location[0] === hero.location[0] && arrayOfEnemies[i].location[1] === hero.location[1]) {
          fightLocation.location = hero.location;
          drawPlayElement(fightLocation);
        }
      }
    }

    displayStats(hero);
  }
};

//Function to draw any object with property location and a property containing an image source on the screen.
  const drawPlayElement = (object) => {
  const xLocation = object.location[0];
  const yLocation = object.location[1];

  const divToAddImage = document.getElementById('cell-' + xLocation + '-' + yLocation);
  divToAddImage.innerHTML = "<img src="+ object.imgSource +">";
};

//Function which starts or stops the game when clicking the button
const clickPlay = () => {

  const playButton = document.getElementById('play-button');

  if(gameIsPlaying) {
    gameIsPlaying = false;
    playButton.innerHTML = 'Start playing';
  } else {
    gameIsPlaying = true;
    playButton.innerHTML = 'Stop playing';
  }
};

//Function to process new name from form
const setNewNameHero = (hero) => {
  const inputField = document.getElementById("input-new-name-hero");
  hero.name = inputField.value;
  displayStats(hero);
};

//-----------------
//-----------------
//Below we setup the game and call the updatePlayingfield when arrowkeys are pressed.

//Initial draw
drawPlayElement(innGame);
drawPlayElement(daggerGame);
drawPlayElement(heroGame);

for(let i=0;i<allEnemies.length;i++) {
  drawPlayElement(allEnemies[i]);
}

displayStats(heroGame);

// Initially game is not playing
let gameIsPlaying = false;

//Must remove following line after I finished the start button.


//Add listener to check for arrow key input
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  //If the pressed key is an arrow key, process the turn.

  if((keyName === 'ArrowLeft') || (keyName === 'ArrowRight') || (keyName === 'ArrowUp') || (keyName === 'ArrowDown')) {

    updatePlayingField(heroGame, allEnemies, innGame, daggerGame, keyName);
  }
});
