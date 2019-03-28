import Creature from './creature'

export default class Troll extends Creature {
  constructor(coordinates, name, hunger) {
    super(coordinates, hunger);
    this.name = name;
    this.symbol = '&';
    this.maxHunger = 10;
  }
}

