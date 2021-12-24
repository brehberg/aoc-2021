const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readMonadProgram(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someMonadProgram = [];
  for await (const line of file) {
    someMonadProgram.push(line.trim().split(/\s+/));
  }
  return someMonadProgram;
}
exports.readMonadProgram = readMonadProgram;
