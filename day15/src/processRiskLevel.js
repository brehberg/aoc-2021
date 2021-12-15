const TinyQueue = require("tinyqueue");

function processRiskLevel(riskLevels, multiplier = 1) {
  const fullMap = expandFullMap(riskLevels, multiplier);
  const maxRow = fullMap.length - 1;
  const maxCol = fullMap[0].length - 1;

  const costs = Array(maxRow + 1)
    .fill()
    .map((_) => Array(maxCol + 1).fill(Infinity));
  costs[0][0] = 0;

  const neighborDirections = [
    { row: -1, col: 0 },
    { row: 0, col: -1 },
    { row: 1, col: 0 },
    { row: 0, col: 1 },
  ];
  const queue = new TinyQueue(
    [{ row: 0, col: 0, value: 0 }],
    (a, b) => a.value - b.value
  );
  while (queue.length) {
    const node = queue.pop();
    for (const dir of neighborDirections) {
      const next = { row: node.row + dir.row, col: node.col + dir.col };
      if (next.row < 0 || next.row > maxRow) continue;
      if (next.col < 0 || next.col > maxCol) continue;
      const newCost = costs[node.row][node.col] + fullMap[next.row][next.col];
      if (newCost < costs[next.row][next.col]) {
        costs[next.row][next.col] = newCost;
        queue.push({ row: next.row, col: next.col, value: newCost });
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
