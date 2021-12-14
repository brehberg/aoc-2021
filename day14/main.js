const { doProcessStepsPart1 } = require("./src/doProcessSteps.js");
const { doProcessStepsPart2 } = require("./src/doProcessSteps.js");

// https://adventofcode.com/2021/day/14
console.log("--- Day 14: Extended Polymerization ---"); 
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doProcessStepsPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 1588
doProcessStepsPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 3906

doProcessStepsPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 2188189693529
doProcessStepsPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 4441317262452

