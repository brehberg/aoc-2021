const { doImageEnhancementPart1 } = require("./src/doImageEnhancement.js");
const { doImageEnhancementPart2 } = require("./src/doImageEnhancement.js");

// https://adventofcode.com/2021/day/20
console.log("--- Day 20: Trench Map ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doImageEnhancementPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 35
doImageEnhancementPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 5479

doImageEnhancementPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 3351
doImageEnhancementPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 19012
