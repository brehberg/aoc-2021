const { readMonadProgram } = require("./readMonadProgram.js");
const { processMonadProgram } = require("./processMonadProgram.js");

async function doPart1(fileName, printResults = false) {
  const data = await readMonadProgram(fileName);
  return processMonadProgram(data, Infinity, printResults);
}
exports.doRunCodePart1 = doPart1;

async function doPart2(fileName, printResults = false) {
  const data = await readMonadProgram(fileName);
  return processMonadProgram(data, -Infinity, printResults);
}
exports.doRunCodePart2 = doPart2;
