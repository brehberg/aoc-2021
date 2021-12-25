function processLocationMap(initialLocations) {
  const floorMap = initialLocations;
  const maxRow = floorMap.length;
  const maxCol = floorMap[0].length;
  const canMove = Array(maxRow)
    .fill()
    .map((_) => Array(maxCol).fill(false));

  let steps = 0;
  while (true) {
    steps += 1;
    let totalMoves = 0;
    // sea cucumbers in the east-facing herd attempt to move
    checkEastFacing(maxRow, maxCol, floorMap, canMove);
    totalMoves += canMove.flat().filter(Boolean).length;
    moveEastFacing(maxRow, maxCol, canMove, floorMap);
    // sea cucumbers in the south-facing herd attempt to move
    checkSouthFacing(maxRow, maxCol, floorMap, canMove);
    totalMoves += canMove.flat().filter(Boolean).length;
    moveSouthFacing(maxRow, maxCol, canMove, floorMap);
    // the first step on which no sea cucumbers move
    if (totalMoves === 0) break;
  }
  return steps;
}
exports.processLocationMap = processLocationMap;

const checkEastFacing = (maxRow, maxCol, floorMap, canMove) => {
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      if (floorMap[row][col] !== ">") continue;
      const nextCol = col === maxCol - 1 ? 0 : col + 1;
      if (floorMap[row][nextCol] === ".") canMove[row][col] = true;
    }
  }
};
const moveEastFacing = (maxRow, maxCol, canMove, floorMap) => {
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      if (!canMove[row][col] || floorMap[row][col] !== ">") continue;
      floorMap[row][col] = ".";
      canMove[row][col] = false;
      const nextCol = col === maxCol - 1 ? 0 : col + 1;
      floorMap[row][nextCol] = ">";
    }
  }
};
const checkSouthFacing = (maxRow, maxCol, floorMap, canMove) => {
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      if (floorMap[row][col] !== "v") continue;
      const nextRow = row === maxRow - 1 ? 0 : row + 1;
      if (floorMap[nextRow][col] === ".") canMove[row][col] = true;
      else if (floorMap[nextRow][col] === ">" && canMove[nextRow][col])
        canMove[row][col] = true;
    }
  }
};
const moveSouthFacing = (maxRow, maxCol, canMove, floorMap) => {
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      if (!canMove[row][col] || floorMap[row][col] !== "v") continue;
      floorMap[row][col] = ".";
      canMove[row][col] = false;
      const nextRow = row === maxRow - 1 ? 0 : row + 1;
      floorMap[nextRow][col] = "v";
    }
  }
};
