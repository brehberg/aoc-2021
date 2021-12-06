const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readLanternfish(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someLanternfish = [];
  for await (const line of file) {
    someLanternfish.push(...line.split(",").map(Number));
  }
  return someLanternfish;
}
exports.readLanternfish = readLanternfish;
