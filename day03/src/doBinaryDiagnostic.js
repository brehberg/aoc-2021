const { readBitArrays } = require("./readBitArrays.js");
const { processPowerConsumption } = require("./processBitArrays.js");
const { processLifeSupportRating } = require("./processBitArrays.js");

async function doPart1(fileName) {
  const data = await readBitArrays(fileName);
  return processPowerConsumption(data);
}
exports.doBinaryDiagnosticPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readBitArrays(fileName);
  return processLifeSupportRating(data);
}
exports.doBinaryDiagnosticPart2 = doPart2;
