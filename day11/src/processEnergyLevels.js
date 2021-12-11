function processEnergyLevels(energyLevels, totalSteps = 1000) {
  const octopusMatrix = new Matrix(energyLevels);
  for (let step = 1; step <= totalSteps; step++) {
    if (octopusMatrix.singleStep()) return step;
  }
  return octopusMatrix.totalFlashCount;
}
exports.processEnergyLevels = processEnergyLevels;

class Matrix {
  constructor(inputData) {
    this.matrix = inputData;
    this.maxRow = this.matrix.length;
    this.maxCol = this.matrix[0].length;
    this.totalFlashes = 0;
    this.stepFlashes = 0;
    this.flashThreshold = 9;
  }
  singleStep() {
    this.stepFlashes = 0;
    // First, the energy level of each octopus increases by 1
    const readyToFlash = this.increaseLevels(0, this.maxRow, 0, this.maxCol);
    // Then, any octopus with an energy level greater than 9 flashes
    this.handleFlashes(readyToFlash);
    // Return true is all octopus flashes have synchronized
    return this.stepFlashes === this.maxRow * this.maxCol;
  }
  propagateFlash(row, col) {
    // Increase the energy level of all adjacent octopuses by 1
    const readyToFlash = this.increaseAdjacent(row, col);
    // An octopus with energy level greater than 9, also flashes
    this.handleFlashes(readyToFlash);
  }
  increaseAdjacent(midRow, midCol) {
    const flashPositions = [];
    for (let row = midRow - 1; row <= midRow + 1; row++) {
      for (let col = midCol - 1; col <= midCol + 1; col++) {
        if (this.outOfBounds(row, col)) continue;
        // An octopus can only flash at most once per step
        if (this.matrix[row][col] !== 0) this.matrix[row][col] += 1;
        if (this.readyToFlash(row, col))
          flashPositions.push({ row: row, col: col });
      }
    }
    return flashPositions;
  }
  increaseLevels(startRow, endRow, startCol, endCol) {
    const flashPositions = [];
    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col < endCol; col++) {
        this.matrix[row][col] += 1;
        if (this.readyToFlash(row, col))
          flashPositions.push({ row: row, col: col });
      }
    }
    return flashPositions;
  }
  handleFlashes(listOfPositions) {
    for (const { row, col } of listOfPositions) {
      if (this.readyToFlash(row, col)) {
        this.totalFlashes += 1;
        this.stepFlashes += 1;
        this.matrix[row][col] = 0;
        this.propagateFlash(row, col);
      }
    }
  }
  readyToFlash(row, col) {
    return this.matrix[row][col] > this.flashThreshold;
  }
  outOfBounds(row, col) {
    return row < 0 || col < 0 || row >= this.maxRow || col >= this.maxCol;
  }
  get totalFlashCount() {
    return this.totalFlashes;
  }
}
