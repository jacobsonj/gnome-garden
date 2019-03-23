// import { inherits } from "util";

/*

garden:
	id - unique id
	grid - 2D Arr
	gnome - Gnome Class extends creature
		name
		health
		lastAte
	trolls - Troll class extends creature
	plants
	pause (defaults to false)

	public:
	-start()
	-stop()
	-pause()
	-save()

	private:
	-genGnome()
	-genTroll()
	-placeNewCreature()
	-getTimeInNSeconds()

creature:

setInterval
*/
let gardenLife = document.getElementById('garden-life');
let count = 0;
const pause = false;
const timer = setInterval(() => {
  if (count >= 20) {
    return clearInterval(timer);
  }
  gardenLife.innerHTML = `Garden Life Span: ${count}`;
  // console.log(count);
  count++;
  console.log(gnomieMyHomie.getMove());
  console.log(trollOne.getMove());
}, 1000);


let holder = document.getElementById('holder');
class Garden {
  constructor(id, grid, gnome, troll, plants) {
    this.id = id;
    this.grid = grid;
    this.gnome = gnome;
    this.troll = troll;
    this.plants = plants;
  }
}

class Creature {
  constructor() {
    this.coordinates = { x: 0, y: 0 };
    this.hunger = 0;
  }
  getMove() {
    let possibleArr = this.getTargets();
    let selectedMove = randElem(possibleArr);

    function randElem(arr) {
      return arr[randNum(0, arr.length - 1)];
    }

    function randNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // console.log(selectedMove);
    return selectedMove;
  }
  getTargets() {
    let possibleCoordinates = [{ x: + this.coordinates.x - 1, y: + this.coordinates.y - 1 }, { x: + this.coordinates.x - 1, y: + this.coordinates.y }, { x: + this.coordinates.x + -1, y: + this.coordinates.y + 1 }, { x: + this.coordinates.x, y: + this.coordinates.y + -1 }, { x: + this.coordinates.x, y: + this.coordinates.y + 1 }, { x: + this.coordinates.x + 1, y: + this.coordinates.y - 1 }, { x: + this.coordinates.x + 1, y: + this.coordinates.y }, { x: + this.coordinates.x + 1, y: + this.coordinates.y + 1 }];
    // console.log(possibleCoordinates);
    return possibleCoordinates;
  }
  updateLocation(getMove) {
    // uses getMove to update the creatures coordinates
  }
  resetHunger(hunger) {
    // sets hunger to 0
  }
  isStarved(hunger) {
    // checks to see if the creatures hunger is greater than its max hunger
  }
}

class Gnome extends Creature {
  constructor(health, name, hunger, coordinates) {
    super(coordinates, hunger);
    this.health = health;
    this.maxHunger = 10;
    this.name = name;
    this.symbol = '@';
    this.planted = 0;
  }
  plant(planted) {
    // incremements planted
  }
}

class Troll extends Creature {
  constructor(coordinates, name, hunger) {
    super(coordinates, hunger);
    this.name = name;
    this.symbol = '&';
  }
}

let gridOne = [['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
['#', '', '', '$', '', '', '', '', '', '#'],
['#', '&', '', '', '', '', '', '$', '', '#'],
['#', '', '', '$', '#', '$', '', '', '', '#'],
['#', '', '', '', '&', '', '', '', '', '#'],
['#', '$', '', '@', '$', '', '', '', '', '#'],
['#', '', '', '', '$', '$', '', '', '', '#'],
['#', '', '', '', '', '', '', '', '#', '#'],
['#', '', '', '', '$', '', '&', '', '$', '#'],
['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

let gnomieMyHomie = new Gnome('6', 'Homie');
let trollOne = new Troll('2-1', 'Groll');
let trollTwo = new Troll('2-5', 'Mroll');
let trollThree = new Troll('4-5', 'Broll');
let trollArmy = [trollOne, trollTwo, trollThree];

function moveCreatures(gnomeObject, grid){

}

render(gnomieMyHomie, trollArmy, gridOne);

// i now need a function that accepts a grid as a parameter and alters it based on methods on the troll and gnome objects
// call this generate and instead of adding your spaces and symbols, just put an ID on each, then use a render that puts things in based on your updated grid.
function render(gnomeObject, trollArray, grid) {
  let trollIndex = 0;
  for (var i in grid) {
    for (var j in grid[i]) {
      let tile = document.createElement('div');
      tile.className = 'tile-class';
      if (grid[i][j] === '@') {
        grid[i][j] = gnomeObject;
        gnomeObject.coordinates.x = i;
        gnomeObject.coordinates.y = j;
        tile.innerHTML = gnomeObject.symbol;
        // console.log(grid[i][j]);
        console.log(gnomeObject.coordinates.x);
      }
      else if (grid[i][j] === '&') {

        let selectedTroll = trollArray[trollIndex];
        grid[i][j] = selectedTroll;
        selectedTroll.coordinates.x = [i];
        selectedTroll.coordinates.y = [j];
        tile.innerHTML = selectedTroll.symbol;
        trollIndex++;
        // console.log(grid[i][j]);
      }
      else { tile.innerHTML = grid[i][j]; }
      holder.appendChild(tile);
    }
  }
}

let gnomeStats = document.getElementById('gnome-stats');

addGnomeStats(gnomieMyHomie);

function addGnomeStats(gnomeObject) {
  let gnomeStatsholder = document.createElement('div');
  gnomeStatsholder.innerHTML = `Name: ${gnomeObject.name}
  
  
  Symbol: ${gnomeObject.symbol}
  Health: ${gnomeObject.health}
  Hunger: ${gnomeObject.hunger}
  Plants Planted: ${gnomeObject.planted}
  Grid Location: ${gnomeObject.coordinates.x},${gnomeObject.coordinates.y} `;
  gnomeStats.appendChild(gnomeStatsholder);

}

let theGarden = new Garden('TG1', gridOne, gnomieMyHomie, trollArmy, 10);
// console.log(theGarden);


// const garden = {
//   name: 'sam',
//   id: 34,
//   blah: {
//     cool: true,
//     things: [5, 6, 7, 8]
//   }
// };

// localStorage.setItem('garden', JSON.stringify(garden));
// // console.log();
// const dehydratedGarden = localStorage.getItem('garden');
// const rehydratedGardenObject = JSON.parse(dehydratedGarden);
// console.log(rehydratedGardenObject);

// let count = 0;
// const pause = false;
// const timer = setInterval(() => {
//   if (count >= 20) {
//     return clearInterval(timer);
//   }
//   console.log('hey');
//   count++;
// }, 1000);
