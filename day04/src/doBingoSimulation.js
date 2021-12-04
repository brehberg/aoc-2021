const { readNumbersAndBoards } = require("./readNumbersAndBoards.js");
const { processNumbersAndBoards } = require("./processNumbersAndBoards.js");

async function doPart1(fileName) {
  const data = await readNumbersAndBoards(fileName);
  return processNumbersAndBoards(data);
}
exports.doBingoSimulationPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readNumbersAndBoards(fileName);
  return processNumbersAndBoards(data, "last");
}
exports.doBingoSimulationPart2 = doPart2;
