const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readBingoData(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const bingoData = { numbers: [], boards: [] };
  for await (const line of file) {
    const trimmedInput = line.trim();
    if (!bingoData.numbers.length) {
      // first lines of input file has the bingo numbers to be drawn
      bingoData.numbers.push(...trimmedInput.split(",").map(Number));
    } else if (!trimmedInput) {
      // blank lines are used to seperate each of the bingo boards
      bingoData.boards.push([]);
    } else {
      // other lines of input represent rows of bingo board values
      bingoData.boards[bingoData.boards.length - 1].push(
        trimmedInput.split(/\s+/).map(Number)
      );
    }
  }
  return bingoData;
}
exports.readBingoData = readBingoData;
