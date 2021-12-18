const { readSnailNumbers } = require("./readSnailNumbers.js");
const { processSnailNumbers } = require("./processSnailNumbers.js");

async function doPart1(fileName) {
  const data = await readSnailNumbers(fileName);
  return processSnailNumbers(data);
}
exports.doMathHomeworkPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readSnailNumbers(fileName);
  return processSnailNumbers(data, true);
}
exports.doMathHomeworkPart2 = doPart2;
