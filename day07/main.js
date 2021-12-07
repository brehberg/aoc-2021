const { doAlignCrabSubsPart1 } = require("./src/doAlignCrabSubs.js");
const { doAlignCrabSubsPart2 } = require("./src/doAlignCrabSubs.js");

// https://adventofcode.com/2021/day/7
console.log("--- Day 7: The Treachery of Whales ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doAlignCrabSubsPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 37
doAlignCrabSubsPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 337488

doAlignCrabSubsPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 168
doAlignCrabSubsPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 89647695
