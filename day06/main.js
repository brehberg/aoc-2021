const { doSpawnFishesPart1 } = require("./src/doSpawnFishes.js");
const { doSpawnFishesPart2 } = require("./src/doSpawnFishes.js");

// https://adventofcode.com/2021/day/6
console.log("--- Day 6: Lanternfish ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doSpawnFishesPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 5934
doSpawnFishesPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 380612

doSpawnFishesPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 26984457539
doSpawnFishesPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 1710166656900
