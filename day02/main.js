const { doDivePart1 } = require("./src/doDive.js");
const { doDivePart2 } = require("./src/doDive.js");

console.log("--- Day 2: Dive! ---"); // https://adventofcode.com/2021/day/2
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doDivePart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 150
doDivePart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 1648020

doDivePart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 900
doDivePart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 1759818555
