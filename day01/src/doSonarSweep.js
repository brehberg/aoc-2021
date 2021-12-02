const { readValues } = require("./readValues.js");
const { processValues } = require("./processValues.js");

async function doPart1(fileName) {
  const values = await readValues(fileName);
  const larger = processValues(values);
  return larger;
}
exports.doSonarSweepPart1 = doPart1;

async function doPart2(fileName) {
  const values = await readValues(fileName);
  const larger = processValues(values, 3);
  return larger;
}
exports.doSonarSweepPart2 = doPart2;
