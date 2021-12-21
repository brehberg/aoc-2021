const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readStartPosition(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someStartPosition = [];
  for await (const line of file) {
    someStartPosition.push(Number(line.trim().slice(-1)));
  }
  return someStartPosition;
}
exports.readStartPosition = readStartPosition;
