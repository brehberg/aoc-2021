const { readLocationMap } = require("./readLocationMap.js");
const { processLocationMap } = require("./processLocationMap.js");

async function doPart1(fileName) {
  const data = await readLocationMap(fileName);
  return processLocationMap(data);
}
exports.doMoveHerdPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readLocationMap(fileName);
  return processLocationMap(data);
}
exports.doMoveHerdPart2 = doPart2;
