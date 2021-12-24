function processRoomDiagram(inputDiagram, foldedDiagram = false) {
  if (foldedDiagram) {
    inputDiagram.rooms = inputDiagram.rooms.map((room) =>
      room.filter((_, i) => i === 0 || i === room.length - 1)
    );
  }
  const burrow = new BurrowState(inputDiagram);
  const cachedEnergyCost = new Map();
  return burrow.makeMoves(cachedEnergyCost, true);
}
exports.processRoomDiagram = processRoomDiagram;

const amphipods = [
  { type: "a", name: "Amber", cost: 1 },
  { type: "b", name: "Bronze", cost: 10 },
  { type: "c", name: "Copper", cost: 100 },
  { type: "d", name: "Desert", cost: 1000 },
];
const entrances = [2, 4, 6, 8];
let minimumEnergy = Infinity;

class BurrowState {
  hall = [];
  homes = [];
  energy = 0;
  constructor(input) {
    if (input) {
      this.hall = input.hallway.map((spot, index) =>
        entrances.includes(index)
          ? "X"
          : spot === "."
          ? spot
          : amphipods.findIndex((p) => p.type === spot.toLowerCase())
      );
      this.homes = input.rooms.map((room) =>
        room
          .reverse()
          .map((pod) =>
            amphipods.findIndex((p) => p.type === pod.toLowerCase())
          )
      );
      this.homeSize = Math.max(...this.homes.map((h) => h.length));
    }
  }
  organized() {
    // burrow state is finalized when all amphipods are back home
    const atHome = this.homes.map((home, index) =>
      home.filter((pod) => pod === index)
    );
    return atHome.flat().length === this.homes.length * this.homeSize;
  }
  openHall(space) {
    return space === "." || space === "X"; // space is unblocked
  }
  validHall(space) {
    return space === "."; // space is available for amphipod to move
  }
  openHome(type) {
    // check if the home only contains expected type of amphipods
    return !this.homes[type].filter((pod) => pod !== type).length;
  }
  clearPath(here, there) {
    // check if all hall spaces between here and there are unblocked
    [here, there] = here > there ? [there, here] : [here + 1, there + 1];
    return !this.hall
      .slice(here, there)
      .filter((position) => !this.openHall(position)).length;
  }
  makeMoves(cache, firstMove = false) {
    if (firstMove) minimumEnergy = Infinity;

    // check for previously cached or currently organized states
    const stateCode = JSON.stringify(this.hall) + JSON.stringify(this.homes);
    const cachedEnergy = cache.get(stateCode) ?? Infinity;
    if (cachedEnergy <= this.energy) return;
    cache.set(stateCode, this.energy);
    if (this.organized()) {
      if (this.energy < minimumEnergy) minimumEnergy = this.energy;
      return;
    }

    // first try to move pods from hallway into homeroom
    for (const [position, pod] of this.hall.entries()) {
      // check if space contains an amphipod
      if (this.openHall(pod)) continue;
      // check if the home is open
      if (!this.openHome(pod)) continue;
      // check if the way is clear
      if (!this.clearPath(position, entrances[pod])) continue;
      // make the move
      this.moveHallToHome(position, pod).makeMoves(cache);
    }
    // second try to move from current room into homeroom
    for (const [index, room] of this.homes.entries()) {
      // find amphipod closest to the door
      if (!room.length) continue;
      const pod = room[room.length - 1];
      // don't move if already in correct home
      if (pod === index) continue;
      // check if the home is open
      if (!this.openHome(pod)) continue;
      // check if the way is clear
      if (!this.clearPath(entrances[index], entrances[pod])) continue;
      // make the move
      this.moveRoomToHome(index, pod).makeMoves(cache);
    }
    // finally try to move from current room into the hallway
    for (const [index, room] of this.homes.entries()) {
      // don't move if everyone in home matches
      if (this.openHome(index)) continue;
      // find amphipod closest to the door
      if (!room.length) continue;
      const pod = room[room.length - 1];
      for (const [position, space] of this.hall.entries()) {
        // check if the hall space is valid
        if (!this.validHall(space)) continue;
        // check if the way is clear
        if (!this.clearPath(entrances[index], position)) continue;
        // make the move
        this.moveRoomToHall(index, position, pod).makeMoves(cache);
      }
    }
    return minimumEnergy;
  }
  moveHallToHome(hallIndex, podIndex) {
    const newState = this.copy();
    newState.hall[hallIndex] = ".";
    newState.homes[podIndex].push(podIndex);
    const spacesMoved =
      Math.abs(hallIndex - entrances[podIndex]) +
      (this.homeSize - this.homes[podIndex].length);
    newState.energy += spacesMoved * amphipods[podIndex].cost;
    return newState;
  }
  moveRoomToHome(roomIndex, podIndex) {
    const newState = this.copy();
    newState.homes[roomIndex].pop();
    newState.homes[podIndex].push(podIndex);
    const spacesMoved =
      Math.abs(entrances[roomIndex] - entrances[podIndex]) +
      (this.homeSize + 1 - this.homes[roomIndex].length) +
      (this.homeSize - this.homes[podIndex].length);
    newState.energy += spacesMoved * amphipods[podIndex].cost;
    return newState;
  }
  moveRoomToHall(roomIndex, hallIndex, podIndex) {
    const newState = this.copy();
    newState.homes[roomIndex].pop();
    newState.hall[hallIndex] = podIndex;
    const spacesMoved =
      Math.abs(entrances[roomIndex] - hallIndex) +
      (this.homeSize + 1 - this.homes[roomIndex].length);
    newState.energy += spacesMoved * amphipods[podIndex].cost;
    return newState;
  }
  copy() {
    const newBurrow = new BurrowState();
    newBurrow.hall = [...this.hall];
    newBurrow.homes = JSON.parse(JSON.stringify(this.homes));
    newBurrow.homeSize = this.homeSize;
    newBurrow.energy = this.energy;
    return newBurrow;
  }
}
exports.BurrowState = BurrowState;
