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
      // Part 1 main function
      const lowPoints = [];
      for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
          const current = heightMap[row][col];
          if (isLowPoint(current, row, col))
            lowPoints.push({ height: current, row: row, col: col });
        }
      }
      return {
        pointData: lowPoints,
        calculateRiskLevel: function () {
          // the risk level of each low point is 1 plus its height
          return this.pointData.reduce((sum, p) => sum + p.height + 1, 0);
        },
      };
    },
    calculateLargestBasins: function (points, numberOfBasins = 3) {
      // Part 2 main function
      points.pointData.forEach((point) => {
        point.size = findBasinSize(point);
      });
      // multiply together the sizes of the three largest basins
      return points.pointData
        .sort((a, b) => b.size - a.size)
        .slice(0, numberOfBasins)
        .reduce((total, point) => total * point.size, 1);
    },
  };

  // Part 1 helper functions
  function isLowPoint(currentHeight, row, col) {
    return (
      (row === 0 || isLower(row - 1, col)) &&
      (row === maxRow || isLower(row + 1, col)) &&
      (col === 0 || isLower(row, col - 1)) &&
      (col === maxCol || isLower(row, col + 1))
    );
    function isLower(otherRow, otherCol) {
      return currentHeight < heightMap[otherRow][otherCol];
    }
  }

  // Part 2 helper functions
  function findBasinSize(startPoint, maxHeight = 9) {
    const marked = Array(maxRow + 1)
      .fill()
      .map(() => Array(maxCol + 1).fill(false));
    const pointsToCheck = [startPoint];
    marked[startPoint.row][startPoint.col] = true;

    while (pointsToCheck.length) {
      const point = pointsToCheck.shift();
      if (point.row !== 0) markNeighbor(point.row - 1, point.col);
      if (point.row !== maxRow) markNeighbor(point.row + 1, point.col);
      if (point.col !== 0) markNeighbor(point.row, point.col - 1);
      if (point.col !== maxCol) markNeighbor(point.row, point.col + 1);
    }
    return marked.reduce((sum, row) => sum + row.filter(Boolean).length, 0);

    function markNeighbor(onRow, onCol) {
      if (heightMap[onRow][onCol] < maxHeight && !marked[onRow][onCol]) {
        pointsToCheck.push({ row: onRow, col: onCol });
        marked[onRow][onCol] = true;
      }
    }
  }
}
