const { doLocateBeaconsPart1 } = require("./src/doLocateBeacons.js");
const { doLocateBeaconsPart2 } = require("./src/doLocateBeacons.js");

// https://adventofcode.com/2021/day/19
console.log("--- Day 19: Beacon Scanner ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doLocateBeaconsPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 79
doLocateBeaconsPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 381

doLocateBeaconsPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 3621
doLocateBeaconsPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 12201
