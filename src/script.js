// questions how to get rid of object object in my stats
// how to remove a troll when he dies
// how to get the max hunger on a troll



// import Creature from './creature'
import Gnome from './gnome'
import Troll from './troll'
import Garden from './garden'




let holder = document.getElementById('holder');

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

let gnomieMyHomie = new Gnome('6', 'Homie', 10);
let trollOne = new Troll('2-1', 'Groll');
let trollTwo = new Troll('2-5', 'Mroll');
let trollThree = new Troll('4-5', 'Broll');
let trollArmy = [trollOne, trollTwo, trollThree];


let theGarden = new Garden('TG1', gridOne, gnomieMyHomie, trollArmy, 10);



generate(gnomieMyHomie, trollArmy, gridOne);

function generate(gnomeObject, trollArray, grid) {
  let trollIndex = 0;
  for (var i in grid) {
    for (var j in grid[i]) {
      let tile = document.createElement('div');
      tile.className = 'tile-class';
      tile.id = `${i},${j}`
      if (grid[i][j] === '@') {
        grid[i][j] = gnomeObject;
        gnomeObject.coordinates.x = i;
        gnomeObject.coordinates.y = j;
        tile.innerHTML = gnomeObject.symbol;
        // console.log(grid[i][j]);
        //console.log(gnomeObject.coordinates.x);
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

let gardenLife = document.getElementById('garden-life');
let count = 0;
let pause = false;
const timer = setInterval(() => {
  if (gnomieMyHomie.isStarved()) {
    return clearInterval(timer);
  }
  for (let i in trollArmy) {
    if (trollArmy[i].isStarved()) {
      // return clearInterval(timer);
      console.log('troll died');
      gridOne[trollArmy[i].coordinates.x][trollArmy[i].coordinates.y] = ''; //this isnt actually removing them. it just takes them off the grid.
    }
  }
  gardenLife.innerHTML = `Garden Life Span: ${count}`;
  theGarden.executeTurn();
  updateStats(gnomieMyHomie, gnomeStats);
  for(let troll in trollArmy){
    updateStats(trollArmy[troll], trollStats);
  }
  count++;
}, 1000);

let gnomeStats = document.getElementById('gnome-stats');
function updateStats(object, div) {
  let gnomeStatsHolder = document.createElement('div');
  for (let property in object) {
    let newProp = document.createElement('div')
    if (property === 'coordinates') {
      newProp.innerHTML = `${property}: ${object[property].x}, ${object[property].y}`;
    }
    newProp.innerHTML = `${property}: ${object[property]}`;
    gnomeStatsHolder.appendChild(newProp);
  }
  div.innerHTML = gnomeStatsHolder.outerHTML;
}

let trollStats = document.getElementById('troll-stats');

