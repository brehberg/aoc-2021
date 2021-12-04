const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readNumbersAndBoards(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const [numbers, boards] = [[], []];
  let boardIndex = -1;
  for await (const line of file) {
    const trimmed = line.trim();
    if (numbers.length === 0) {
      // first lines of input file lists the numbers to be drawn
      numbers.push(...trimmed.split(",").map((c) => parseInt(c)));
    } else if (trimmed === "") {
      // blank lines are used to seperate each of the bingo boards
      boards.push([]);
      boardIndex++;
    } else {
      // all other lines represent a new row of bingo board values
      boards[boardIndex].push(trimmed.split(/\s+/).map((c) => parseInt(c)));
    }
  }
  return { numbers: numbers, boards: boards };
}
exports.readNumbersAndBoards = readNumbersAndBoards;
