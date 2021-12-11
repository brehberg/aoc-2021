const { readEnergyLevels } = require("./readEnergyLevels.js");
const { processEnergyLevels } = require("./processEnergyLevels.js");

async function doPart1(fileName) {
  const data = await readEnergyLevels(fileName);
  return processEnergyLevels(data, 100);
}
exports.doSimulateFlashesPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readEnergyLevels(fileName);
  return processEnergyLevels(data);
}
exports.doSimulateFlashesPart2 = doPart2;
