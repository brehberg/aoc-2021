const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readCaveSystem(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someCaveSystem = [];
  for await (const line of file) {
    someCaveSystem.push(line.split("-"));
  }
  return someCaveSystem;
}
exports.readCaveSystem = readCaveSystem;
