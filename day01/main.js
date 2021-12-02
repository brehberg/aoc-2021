const { doSonarSweepPart1, doSonarSweepPart2 } = require("./src/doSonarSweep.js");
// https://adventofcode.com/2021/day/1

doSonarSweepPart1("./data/example.txt").then((result) =>
  console.log(`Part One: Example: ${result}`)
); // 7
doSonarSweepPart1("./data/input.txt").then((result) =>
  console.log(`Part One: Answer: ${result}`)
); // 1557

doSonarSweepPart2("./data/example.txt").then((result) =>
  console.log(`Part Two: Example: ${result}`)
); // 5
doSonarSweepPart2("./data/input.txt").then((result) =>
  console.log(`Part Two: Answer: ${result}`)
); // 1608
