const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readSignalPatterns(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const signalData = [];
  for await (const line of file) {
    const splitLine = line.split("|");
    if (splitLine.length === 2)
      signalData.push({
        uniquePatterns: splitLine[0].trim().split(/\s+/),
        outputValues: splitLine[1].trim().split(/\s+/),
      });
  }
  return signalData;
}
exports.readSignalPatterns = readSignalPatterns;
