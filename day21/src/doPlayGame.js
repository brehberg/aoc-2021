const { readStartPosition } = require("./readStartPosition.js");
const { processStartPosition } = require("./processStartPosition.js");

async function doPart1(fileName) {
  const data = await readStartPosition(fileName);
  return processStartPosition(data);
}
exports.doPlayGamePart1 = doPart1;

async function doPart2(fileName) {
  const data = await readStartPosition(fileName);
  return processStartPosition(data, true);
}
exports.doPlayGamePart2 = doPart2;
