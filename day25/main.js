const { doMoveHerdPart1 } = require("./src/doMoveHerd.js");

// https://adventofcode.com/2021/day/25
console.log("--- Day 25: Sea Cucumber ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doMoveHerdPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 58
doMoveHerdPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 380
