const { doSonarSweepPart1 } = require("./src/doSonarSweep.js");
const { doSonarSweepPart2 } = require("./src/doSonarSweep.js");

console.log("--- Day 1: Sonar Sweep ---"); // https://adventofcode.com/2021/day/1
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doSonarSweepPart1(testFile).then((result) =>
  console.log(`Part One: Example: ${result}`)
); // 7
doSonarSweepPart1(realFile).then((result) =>
  console.log(`Part One: Answer: ${result}`)
); // 1557

doSonarSweepPart2(testFile).then((result) =>
  console.log(`Part Two: Example: ${result}`)
); // 5
doSonarSweepPart2(realFile).then((result) =>
  console.log(`Part Two: Answer: ${result}`)
); // 1608
