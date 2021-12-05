const { readBingoData } = require("./readBingoData.js");
const { processBingoData } = require("./processBingoData.js");

async function doPart1(fileName) {
  const data = await readBingoData(fileName);
  return processBingoData(data);
}
exports.doBingoSimulationPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readBingoData(fileName);
  return processBingoData(data, "last");
}
exports.doBingoSimulationPart2 = doPart2;
