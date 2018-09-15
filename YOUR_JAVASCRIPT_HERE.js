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
  return object;
};

// Assignment is unclear on this function, assignment says add weapon object to end of inventory array. I initially interpreted this as the hero's weapon. However, what is meant is add the item to be picked up (argument of function) to the end of the array. Further on, this does turn out to be a weapon, but it does not have to be.
const pickUpItem = (someHero, itemToPickUp) => {
  someHero.inventory.push(itemToPickUp);
};

const equipWeapon = (someHero) => {
  // If inventory has no entries, or the first entry is an empty object, then this function should do nothing.
  // Inverse: if inventory does NOT have 0 entries AND first entry is NOT an ampty object, function should be executed. The hero is equipped with the first item from its inventory.
  if (someHero.inventory.length !== 0 && someHero.inventory[0] !== {}) {
    someHero.weapon = someHero.inventory[0];
  }
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
