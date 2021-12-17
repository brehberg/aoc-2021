const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readTargetArea(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someTargetArea = [];
  for await (const line of file) {
    const coordinates = line.match(/-?\d+/g).map(Number);
    coordinates.length === 4 &&
      someTargetArea.push({
        xMin: coordinates[0],
        xMax: coordinates[1],
        yMin: coordinates[2],
        yMax: coordinates[3],
      });
  }
  return someTargetArea[0];
}
exports.readTargetArea = readTargetArea;
