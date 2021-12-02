const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readCommands(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const commands = [];
  for await (const line of file) {
    commands.push(line.split(/\s+/));
  }
  return commands;
}
exports.readCommands = readCommands;
