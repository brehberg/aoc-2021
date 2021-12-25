const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readLocationMap(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someLocationMap = [];
  for await (const line of file) {
    someLocationMap.push(line.split(""));
  }
  return someLocationMap;
}
exports.readLocationMap = readLocationMap;
