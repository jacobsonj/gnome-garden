import Gnome from "./gnome";



export default class Garden {
  constructor(id, grid, gnome, troll, plants) {
    this.id = id;
    this.grid = grid;
    this.gnome = gnome;
    this.troll = troll;
    this.plants = plants;
  }

  render() {
    for (var i in this.grid) {
      for (var j in this.grid) {
        let currentTile = document.getElementById(`${i},${j}`)
        currentTile.innerHTML = this.grid[i][j];
      }
    }
  }

  executeTurn() {
    let nextCoordsGnome = this.gnome.getMove(this.grid);
    if (this.grid[nextCoordsGnome.x][nextCoordsGnome.y] === '$') {
      this.gnome.resetHunger();
    }
    this.handleMove(this.gnome.coordinates, nextCoordsGnome);
    if (this.gnome.tryPlant()) {
      this.grid[this.gnome.coordinates.x][this.gnome.coordinates.y] = '$';
    }
    this.gnome.updateLocation(nextCoordsGnome);
    this.gnome.hunger++;
    // trolls
    for (let i in this.troll) {
      let nextCoordsTroll = this.troll[i].getMove(this.grid);
      if (this.grid[nextCoordsTroll.x][nextCoordsTroll.y].toString() === '@') {
        alert(`${this.troll[i].name} the troll attacked ${this.gnome.name} the gnome`);
        this.gnome.health--;
      }
      else {
        this.handleMove(this.troll[i].coordinates, nextCoordsTroll);
        this.troll[i].updateLocation(nextCoordsTroll);
        this.troll[i].hunger++;
      }
    }
    this.render();

    // moves gnome & trolls, checks their hunger levels, sees if anyone's won yet, increases hunger, & calls render
  }

  handleMove(coordsFrom, coordsTo) {
    this.grid[coordsTo.x][coordsTo.y] = this.grid[+coordsFrom.x][+coordsFrom.y];
    this.grid[+coordsFrom.x][+coordsFrom.y] = '';

  }
}