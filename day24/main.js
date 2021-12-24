const { doRunCodePart1 } = require("./src/doRunCode.js");
const { doRunCodePart2 } = require("./src/doRunCode.js");

// https://adventofcode.com/2021/day/24
console.log("--- Day 24: Arithmetic Logic Unit ---\n");
const realFile = `${__dirname}/data/input.txt`;

doRunCodePart1(realFile, true).then((result) =>
  console.log(`\nPart One Answer: ${result}\n`)
); // 99429795993929

doRunCodePart2(realFile, true).then((result) =>
  console.log(`\nPart Two Answer: ${result}\n`)
); // 18113181571611
