const { readHeightMap } = require("./readHeightMap.js");
const { processHeightMap } = require("./processHeightMap.js");

async function doPart1(fileName) {
  const data = await readHeightMap(fileName);
  return processHeightMap(data);
}
exports.doAnalyzeCavesPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readHeightMap(fileName);
  return processHeightMap(data, true);
}
exports.doAnalyzeCavesPart2 = doPart2;
