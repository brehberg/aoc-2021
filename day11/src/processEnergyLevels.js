function processEnergyLevels(energyLevels, totalSteps = 1000) {
  const octopusMatrix = new Matrix(energyLevels);
  for (let step = 1; step <= totalSteps; step++) {
    if (octopusMatrix.singleStep()) return step;
  }
  return octopusMatrix.flashes;
}
exports.processEnergyLevels = processEnergyLevels;

class Matrix {
  constructor(inputData) {
    this.matrix = inputData;
    this.maxRow = this.matrix.length;
    this.maxCol = this.matrix[0].length;
    this.totalFlashes = 0;
    this.stepFlashes = 0;
  }
  get flashes() {
    return this.totalFlashes;
  }
  singleStep() {
    this.stepFlashes = 0;
    // First, the energy level of each octopus increases by 1
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        this.matrix[row][col]++;
      }
    }
    // Then, any octopus with an energy level greater than 9 flashes
    for (let row = 0; row < this.maxRow; row++) {
      for (let col = 0; col < this.maxCol; col++) {
        this.handleFlash(row, col);
      }
    }
    return this.stepFlashes === this.maxRow * this.maxCol;
  }
  increaseAdjacent(inRow, inCol) {
    // Increase the energy level of all adjacent octopuses by 1
    for (let row = inRow - 1; row <= inRow + 1; row++) {
      for (let col = inCol - 1; col <= inCol + 1; col++) {
        if (this.outOfBounds(row, col)) continue;
        // An octopus can only flash at most once per step
        if (this.matrix[row][col] !== 0) this.matrix[row][col]++;
      }
    }
    // An octopus with energy level greater than 9, also flashes
    for (let row = inRow - 1; row <= inRow + 1; row++) {
      for (let col = inCol - 1; col <= inCol + 1; col++) {
        if (this.outOfBounds(row, col)) continue;
        this.handleFlash(row, col);
      }
    }
  }
  handleFlash(row, col) {
    if (this.matrix[row][col] > 9) {
      this.totalFlashes++;
      this.stepFlashes++;
      this.matrix[row][col] = 0;
      this.increaseAdjacent(row, col);
    }
  }
  outOfBounds(row, col) {
    return row < 0 || col < 0 || row >= this.maxRow || col >= this.maxCol;
  }
}
