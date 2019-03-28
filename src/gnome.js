import Creature from './creature'
import randNum from "./utils"

export default class Gnome extends Creature {
  constructor(health, name, maxHunger, hunger, coordinates) {
    super(coordinates, hunger);
    this.health = health;
    this.maxHunger = maxHunger;
    this.name = name;
    this.symbol = '@';
    this.planted = 0;
  }
  tryPlant() {
    if (randNum(1, 4) === 4){
      this.planted++;
      return true;
    }
    return false;

    function randNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }

  
}