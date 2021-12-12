const { readCaveSystem } = require("./readCaveSystem.js");
const { processCaveSystem } = require("./processCaveSystem.js");

async function doPart1(fileName) {
  const data = await readCaveSystem(fileName);
  return processCaveSystem(data);
}
exports.doPathFindingPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readCaveSystem(fileName);
  return processCaveSystem(data, true);
}
exports.doPathFindingPart2 = doPart2;
