const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readHeightMap(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const inputHeightMap = [];
  for await (const line of file) {
    inputHeightMap.push(line.split("").map(Number));
  }
  return inputHeightMap;
}
exports.readHeightMap = readHeightMap;
