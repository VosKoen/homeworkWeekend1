// Write your JS here

const hero = {
  name: '',
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
const pickUpItem = (hero, itemToPickUp) => {
  hero.inventory.push(itemToPickUp);
};

const equipWeapon = (hero) => {
  // If inventory has no entries, or the first entry is an empty object, then this function should do nothing.
  // Inverse: if inventory does NOT have 0 entries AND first entry is NOT an ampty object, function should be executed.
  if (hero.inventory.length !== 0 && hero.inventory[0] !== {}) {
    hero.weapon = hero.inventory[0];
  }
};

//Weapon to be picked up by hero
const dagger = {
  type: 'dagger',
  damage: 2
};
