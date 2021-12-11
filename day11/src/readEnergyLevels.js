const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readEnergyLevels(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someEnergyLevels = [];
  for await (const line of file) {
    someEnergyLevels.push(line.split("").map(Number));
  }
  return someEnergyLevels;
}
exports.readEnergyLevels = readEnergyLevels;
