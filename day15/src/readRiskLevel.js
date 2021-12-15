const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readRiskLevel(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someRiskLevel = [];
  for await (const line of file) {
    someRiskLevel.push(line.split("").map(Number));
  }
  return someRiskLevel;
}
exports.readRiskLevel = readRiskLevel;
