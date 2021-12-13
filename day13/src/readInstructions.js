const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readInstructions(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const instructions = { randomDots: [], foldDirections: [] };
  let loadDots = true;
  for await (const line of file) {
    // blank line indicates end of dots and start of folds
    if (!line && instructions.randomDots.length) loadDots = false;
    else if (loadDots) {
      // random dots are listed by x,y coordinates with format "6,10"
      const numbers = line.split(",").map(Number);
      numbers.length === 2 &&
        instructions.randomDots.push({ x: numbers[0], y: numbers[1] });
    } else if (!loadDots) {
      // folds are listed by instructions with format "fold along y=7"
      const matches = line.match(/([xy])=(\d+)/);
      matches.length &&
        instructions.foldDirections.push({
          axis: matches[1],
          line: matches[2],
        });
    }
  }
  return instructions;
}
exports.readInstructions = readInstructions;
