const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readNumbersAndBoards(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const [numbers, boards] = [[], []];
  for await (const line of file) {
    const trimmed = line.trim();
    if (numbers.length === 0) {
      // first lines of input file lists the numbers to be drawn
      numbers.push(...trimmed.split(",").map(Number));
    } else if (trimmed === "") {
      // blank lines are used to seperate each of the bingo boards
      boards.push([]);
    } else {
      // all other lines represent a row of cuurent board values
      boards[boards.length - 1].push(trimmed.split(/\s+/).map(Number));
    }
  }
  return { numbers: numbers, boards: boards };
}
exports.readNumbersAndBoards = readNumbersAndBoards;
