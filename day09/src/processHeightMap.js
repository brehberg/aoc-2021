function processHeightMap(heightMapData, returnRiskLevel = true) {
  const heightMap = initializeHeightMap(heightMapData);
  const lowPoints = heightMap.determineLowPoints();
  if (returnRiskLevel) return lowPoints.calculateRiskLevel();
  return heightMap.calculateLargestBasins(lowPoints);
}
exports.processHeightMap = processHeightMap;

function initializeHeightMap(heightMapInput) {
  const heightMap = heightMapInput;
  const maxRow = heightMap.length - 1;
  const maxCol = heightMap[0].length - 1;
  return {
    determineLowPoints: function () {
      // Part 1
      const lowPoints = [];
      for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
          const current = heightMap[row][col];
          isLowPoint(current, row, col) &&
            lowPoints.push({ height: current, size: 0, row: row, col: col });
        }
      }
      return {
        pointData: lowPoints,
        calculateRiskLevel: function () {
          // the risk level of a low point is 1 plus its height
          return this.pointData.reduce((sum, p) => sum + p.height + 1, 0);
        },
      };
    },
    calculateLargestBasins: function (points) {
      // Part 2
      points.pointData.forEach((point) => {
        point.size = findBasinSize(point);
      });
      // multiply together the sizes of the three largest basins
      return points.pointData
        .sort((a, b) => b.size - a.size)
        .slice(0, 3)
        .reduce((total, point) => total * point.size, 1);
    },
  };
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
  function isLowPoint(current, row, col) {
    return (
      (row === 0 || isLower(current, row - 1, col)) &&
      (row === maxRow || isLower(current, row + 1, col)) &&
      (col === 0 || isLower(current, row, col - 1)) &&
      (col === maxCol || isLower(current, row, col + 1))
    );
  }
  function isLower(currentHeight, otherRow, otherCol) {
    return currentHeight < heightMap[otherRow][otherCol];
  }
}
