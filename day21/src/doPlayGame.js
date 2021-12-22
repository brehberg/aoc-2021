const { readStartPosition } = require("./readStartPosition.js");
const { processStartPosition } = require("./processStartPosition.js");

async function doPart1(fileName, printResults = false) {
  const data = await readStartPosition(fileName);
  return processStartPosition(data, printResults);
}
exports.doPlayGamePart1 = doPart1;

async function doPart2(fileName, printResults = false) {
  const data = await readStartPosition(fileName);
  return processStartPosition(data, printResults, true);
}
exports.doPlayGamePart2 = doPart2;
