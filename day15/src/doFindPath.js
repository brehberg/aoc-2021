const { readRiskLevel } = require("./readRiskLevel.js");
const { processRiskLevel } = require("./processRiskLevel.js");

async function doPart1(fileName) {
  const data = await readRiskLevel(fileName);
  return processRiskLevel(data);
}
exports.doFindPathPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readRiskLevel(fileName);
  return processRiskLevel(data, 5);
}
exports.doFindPathPart2 = doPart2;
