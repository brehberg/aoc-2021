function processRiskLevel(riskLevels, multiplier = 1) {
  const fullMap = expandFullMap(riskLevels, multiplier);
  const maxRow = fullMap.length - 1;
  const maxCol = fullMap[0].length - 1;

  const costs = Array(maxRow + 1)
    .fill()
    .map((_) => Array(maxCol + 1).fill(Infinity));
  costs[0][0] = 0;

  let costChanged = true;
  while (costChanged) {
    costChanged = false;
    for (let row = 0; row <= maxRow; row++) {
      for (let col = 0; col <= maxCol; col++) {
        const above = row === 0 ? Infinity : costs[row - 1][col];
        const left = col === 0 ? Infinity : costs[row][col - 1];
        const below = row === maxRow ? Infinity : costs[row + 1][col];
        const right = col === maxCol ? Infinity : costs[row][col + 1];
        const newCost = fullMap[row][col] + Math.min(above, left, below, right);
        if (costs[row][col] > newCost) {
          costs[row][col] = newCost;
          costChanged = true;
        }
      }
    }
  }
  return costs[maxRow][maxCol];
}
exports.processRiskLevel = processRiskLevel;

function expandFullMap(input, multiplier) {
  const maxRow = input.length;
  const maxCol = input[0].length;
  const fullMap = Array(maxRow * multiplier)
    .fill()
    .map((_) => Array(maxCol * multiplier).fill(0));

  for (let row = 0; row < fullMap.length; row++) {
    for (let col = 0; col < fullMap[0].length; col++) {
      let value = input[row % maxRow][col % maxCol];
      value += Math.floor(row / maxRow);
      value += Math.floor(col / maxCol);
      fullMap[row][col] = ((value - 1) % 9) + 1;
    }
  }
  return fullMap;
}
