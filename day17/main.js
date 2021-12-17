const { doLaunchProbePart1 } = require("./src/doLaunchProbe.js");
const { doLaunchProbePart2 } = require("./src/doLaunchProbe.js");

// https://adventofcode.com/2021/day/17
console.log("--- Day 17: Trick Shot ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doLaunchProbePart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 45
doLaunchProbePart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 2278

doLaunchProbePart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 112
doLaunchProbePart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 996
