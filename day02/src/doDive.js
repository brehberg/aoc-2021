const { readCommands } = require("./readCommands.js");
const { processCommands } = require("./processCommands.js");

async function doPart1(fileName) {
  const commands = await readCommands(fileName);
  return processCommands(commands);
}
exports.doDivePart1 = doPart1;

async function doPart2(fileName) {
  const commands = await readCommands(fileName);
  return processCommands(commands, "advanced");
}
exports.doDivePart2 = doPart2;
