const { readInstructions } = require("./readInstructions.js");
const { processInstructions } = require("./processInstructions.js");

async function doPart1(fileName) {
  const data = await readInstructions(fileName);
  return processInstructions(data);
}
exports.doFoldPaperPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readInstructions(fileName);
  return processInstructions(data, true);
}
exports.doFoldPaperPart2 = doPart2;
