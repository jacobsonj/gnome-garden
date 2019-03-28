
export default class Creature {
  constructor() {
    this.coordinates = { x: 0, y: 0 };
    this.hunger = 0;
  }
  toString(){
    return this.symbol;
  }
  getMove(grid) {
    let possibleArr = this.getTargets(grid);
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
  getTargets(grid) {
    
    let {x, y} = this.coordinates;

    let possibleCoordinates = [
      { x: + x - 1, y: + y - 1 },
      { x: + x - 1, y: + y },
      { x: + x + -1, y: + y + 1 },
      { x: + x, y: + y + -1 },
      { x: + x, y: + y + 1 },
      { x: + x + 1, y: + y - 1 },
      { x: + x + 1, y: + y },
      { x: + x + 1, y: + y + 1 }];
    // console.log(possibleCoordinates);

    possibleCoordinates =  possibleCoordinates.filter((potential)=>{
        if (potential.x < 0) { // x is negative
         return false;
        }else if (potential.y < 0) { // y is negative
         return false;
        }else if (potential.x >= grid.length){
         return false;
        }
        else if (potential.y >= grid[potential.x].length){
         return false;
        }
        else if (grid[potential.x][potential.y] === '#' || grid[potential.x][potential.y].toString() === '&'){ // impassable terrain
         return false;
        }
        // else{
        //   console.log(grid[potential.x][potential.y])
        // }
        return true;
      });
  
    return possibleCoordinates;
  }
  updateLocation(coords) {
    this.coordinates = coords;
  }
  resetHunger() {
    this.hunger = 0;
  }
  isStarved() {
    return this.hunger > this.maxHunger;
  }
}

