const { doMathHomeworkPart1 } = require("./src/doMathHomework.js");
const { doMathHomeworkPart2 } = require("./src/doMathHomework.js");

// https://adventofcode.com/2021/day/18
console.log("--- Day 18: Snailfish ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doMathHomeworkPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 4140
doMathHomeworkPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 4017

doMathHomeworkPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 3993
doMathHomeworkPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 4583
