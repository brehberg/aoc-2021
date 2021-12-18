const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readSnailNumbers(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someSnailNumbers = [];
  for await (const line of file) {
    line && someSnailNumbers.push(JSON.parse(line));
  }
  return someSnailNumbers;
}
exports.readSnailNumbers = readSnailNumbers;
