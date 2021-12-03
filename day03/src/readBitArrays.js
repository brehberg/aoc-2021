const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readBitArrays(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someBitArrays = [];
  for await (const line of file) {
    someBitArrays.push(line.split('').map(c => parseInt(c)));
  }
  return someBitArrays;
}
exports.readBitArrays = readBitArrays;
