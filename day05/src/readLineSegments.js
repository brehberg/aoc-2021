const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readLineSegments(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const lineSegments = [];
  for await (const line of file) {
    const numbers = line.match(/\d+/g).map(Number);
    numbers.length === 4 &&
      lineSegments.push({
        start: { x: numbers[0], y: numbers[1] },
        end: { x: numbers[2], y: numbers[3] },
      });
  }
  return lineSegments;
}
exports.readLineSegments = readLineSegments;
