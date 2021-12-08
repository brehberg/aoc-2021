const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readSignalPatterns(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const signalData = [];
  for await (const line of file) {
    const splitLine = line.split("|").map((s) => s.trim().split(/\s+/));
    splitLine.length === 2 &&
      splitLine[0].length === 10 &&
      splitLine[1].length === 4 &&
      signalData.push({
        uniquePatterns: splitLine[0],
        outputValues: splitLine[1],
      });
  }
  return signalData;
}
exports.readSignalPatterns = readSignalPatterns;
