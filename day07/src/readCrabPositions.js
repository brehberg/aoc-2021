const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readCrabPositions(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someCrabPositions = [];
  for await (const line of file) {
    someCrabPositions.push(...line.split(",").map(Number));
  }
  return someCrabPositions;
}
exports.readCrabPositions = readCrabPositions;
