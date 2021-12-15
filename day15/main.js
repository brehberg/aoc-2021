const { doFindPathPart1 } = require("./src/doFindPath.js");
const { doFindPathPart2 } = require("./src/doFindPath.js");

// https://adventofcode.com/2021/day/15
console.log("--- Day 15: Chiton ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doFindPathPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 40
doFindPathPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 441

doFindPathPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 315
doFindPathPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 2849
