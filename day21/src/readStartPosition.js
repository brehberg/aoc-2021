const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readStartPosition(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someStartPosition = [];
  for await (const line of file) {
    const regexMatch = line.match(/(.+) starting position: (\d+)/);
    regexMatch &&
      someStartPosition.push({
        name: regexMatch[1],
        position: Number(regexMatch[2]),
      });
  }
  return someStartPosition;
}
exports.readStartPosition = readStartPosition;
