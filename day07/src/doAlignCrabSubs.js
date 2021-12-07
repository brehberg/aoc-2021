const { readCrabPositions } = require("./readCrabPositions.js");
const { processCrabPositions } = require("./processCrabPositions.js");

async function doPart1(fileName) {
  const data = await readCrabPositions(fileName);
  return processCrabPositions(data);
}
exports.doAlignCrabSubsPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readCrabPositions(fileName);
  return processCrabPositions(data, "complex");
}
exports.doAlignCrabSubsPart2 = doPart2;
