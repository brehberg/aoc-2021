const { doOrganizeAmphipodsPart1 } = require("./src/doOrganizeAmphipods.js");
const { doOrganizeAmphipodsPart2 } = require("./src/doOrganizeAmphipods.js");

// https://adventofcode.com/2021/day/23
console.log("--- Day 23: Amphipod ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doOrganizeAmphipodsPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 12521
doOrganizeAmphipodsPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 11120

doOrganizeAmphipodsPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 44169
doOrganizeAmphipodsPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 49232
