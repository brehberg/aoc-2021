const { doPathFindingPart1 } = require("./src/doPathFinding.js");
const { doPathFindingPart2 } = require("./src/doPathFinding.js");

// https://adventofcode.com/2021/day/12
console.log("--- Day 12: Passage Pathing ---"); 
const basicFile = `${__dirname}/data/example2.txt`;
const testFile = `${__dirname}/data/example3.txt`;
const realFile = `${__dirname}/data/input.txt`;

doPathFindingPart1(basicFile).then((result) =>
  console.log(`Part One Basic: ${result}`)
); // 19
doPathFindingPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 226
doPathFindingPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 4754

doPathFindingPart2(basicFile).then((result) =>
  console.log(`Part Two Basic: ${result}`)
); // 103
doPathFindingPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 3509
doPathFindingPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 143562
