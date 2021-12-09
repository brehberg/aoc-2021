const { doAnalyzeCavesPart1 } = require("./src/doAnalyzeCaves.js");
const { doAnalyzeCavesPart2 } = require("./src/doAnalyzeCaves.js");

// https://adventofcode.com/2021/day/9
console.log("--- Day 9: Smoke Basin ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doAnalyzeCavesPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 15
doAnalyzeCavesPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 530

doAnalyzeCavesPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 1134
doAnalyzeCavesPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 1019494
