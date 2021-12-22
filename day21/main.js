const { doPlayGamePart1 } = require("./src/doPlayGame.js");
const { doPlayGamePart2 } = require("./src/doPlayGame.js");

// https://adventofcode.com/2021/day/21
console.log("--- Day 21: Dirac Dice ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doPlayGamePart1(testFile, true).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 739785
doPlayGamePart1(realFile, true).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 679329

doPlayGamePart2(testFile, true).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 444356092776315
doPlayGamePart2(realFile, true).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 433315766324816
