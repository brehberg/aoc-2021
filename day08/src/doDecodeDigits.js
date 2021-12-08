const { readSignalPatterns } = require("./readSignalPatterns.js");
const { processSignalPatterns } = require("./processSignalPatterns.js");
const { countEasyOutputValues } = require("./processSignalPatterns.js");

async function doPart1(fileName) {
  const data = await readSignalPatterns(fileName);
  return countEasyOutputValues(data);
}
exports.doDecodeDigitsPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readSignalPatterns(fileName);
  return processSignalPatterns(data);
}
exports.doDecodeDigitsPart2 = doPart2;
