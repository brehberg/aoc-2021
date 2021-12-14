const { readPolymerFormula } = require("./readPolymerFormula.js");
const { processPolymerFormula } = require("./processPolymerFormula.js");

async function doPart1(fileName) {
  const data = await readPolymerFormula(fileName);
  return processPolymerFormula(data, 10);
}
exports.doProcessStepsPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readPolymerFormula(fileName);
  return processPolymerFormula(data, 40);
}
exports.doProcessStepsPart2 = doPart2;
