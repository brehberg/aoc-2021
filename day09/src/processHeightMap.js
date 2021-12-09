function processHeightMap(heightMap, returnSize = false) {
  const maxRow = heightMap.length - 1;
  const maxCol = heightMap[0].length - 1;
  const lowPoints = [];
  // Part 1
  for (let row = 0; row <= maxRow; row++) {
    for (let col = 0; col <= maxCol; col++) {
      const current = heightMap[row][col];
      (row === 0 || isLower(current, row - 1, col)) &&
        (row === maxRow || isLower(current, row + 1, col)) &&
        (col === 0 || isLower(current, row, col - 1)) &&
        (col === maxCol || isLower(current, row, col + 1)) &&
        lowPoints.push({ height: current, size: 0, row: row, col: col });
    }
  }
  function isLower(currentHeight, otherRow, otherCol) {
    return currentHeight < heightMap[otherRow][otherCol];
  }
  if (!returnSize) {
    return lowPoints.length + lowPoints.reduce((sum, p) => sum + p.height, 0);
  }
  // Part 2
  for (const point of lowPoints) {
    point.size = findBasinSize(point);
  }
  return lowPoints
    .sort((a, b) => b.size - a.size)
    .slice(0, 3)
    .reduce((total, p) => total * p.size, 1);

  function findBasinSize(pointData) {
    const marked = Array(maxRow + 1)
      .fill()
      .map(() => Array(maxCol + 1).fill(false));
    marked[pointData.row][pointData.col] = true;
    let changed = true;

    while (changed) {
      changed = false;
      for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
          const current = marked[row][col];
          if (current && row !== 0) checkAndMarkNeighbor(row - 1, col);
          if (current && row !== maxRow) checkAndMarkNeighbor(row + 1, col);
          if (current && col !== 0) checkAndMarkNeighbor(row, col - 1);
          if (current && col !== maxCol) checkAndMarkNeighbor(row, col + 1);
        }
      }
    }
    function checkAndMarkNeighbor(otherRow, otherCol) {
      if (heightMap[otherRow][otherCol] !== 9 && !marked[otherRow][otherCol]) {
        marked[otherRow][otherCol] = true;
        changed = true;
      }
    }
    return marked.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
  }
}
exports.processHeightMap = processHeightMap;
