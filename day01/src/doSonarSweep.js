const { readValues } = require("./readValues.js");
const { processValues } = require("./processValues.js");

async function doPart1(fileName) {
  const values = await readValues(fileName);
  return processValues(values);
}
exports.doSonarSweepPart1 = doPart1;

async function doPart2(fileName) {
  const values = await readValues(fileName);
  return processValues(values, 3);
}
exports.doSonarSweepPart2 = doPart2;
