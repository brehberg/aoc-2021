const { doSimulateFlashesPart1 } = require("./src/doSimulateFlashes.js");
const { doSimulateFlashesPart2 } = require("./src/doSimulateFlashes.js");

// https://adventofcode.com/2021/day/11
console.log("--- Day 11: Dumbo Octopus ---"); 
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doSimulateFlashesPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 1656
doSimulateFlashesPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 1585

doSimulateFlashesPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 195
doSimulateFlashesPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 382
return;
