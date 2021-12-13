const { doFoldPaperPart1 } = require("./src/doFoldPaper.js");
const { doFoldPaperPart2 } = require("./src/doFoldPaper.js");

// https://adventofcode.com/2021/day/13
console.log("--- Day 13: Transparent Origami ---"); 
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doFoldPaperPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 17
doFoldPaperPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 621

doFoldPaperPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 16 => O
doFoldPaperPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 95 => HKUJGAJZ
