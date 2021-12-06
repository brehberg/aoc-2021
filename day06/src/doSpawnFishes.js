const { readLanternfish } = require("./readLanternfish.js");
const { processLanternfish } = require("./processLanternfish.js");

async function doPart1(fileName) {
  const data = await readLanternfish(fileName);
  return processLanternfish(data, 80);
}
exports.doSpawnFishesPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readLanternfish(fileName);
  return processLanternfish(data, 256);
}
exports.doSpawnFishesPart2 = doPart2;
