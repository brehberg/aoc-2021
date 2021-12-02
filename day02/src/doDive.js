const { readCommands } = require("./readCommands.js");
const { processCommands } = require("./processCommands.js");

async function doPart1(fileName) {
  const commands = await readCommands(fileName);
  const answer = processCommands(commands);
  return answer;
}
exports.doDivePart1 = doPart1;

async function doPart2(fileName) {
  const commands = await readCommands(fileName);
  const answer = processCommands(commands, "advanced");
  return answer;
}
exports.doDivePart2 = doPart2;
