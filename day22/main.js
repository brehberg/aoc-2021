const { doCubeControlPart1 } = require("./src/doCubeControl.js");
const { doCubeControlPart2 } = require("./src/doCubeControl.js");

// https://adventofcode.com/2021/day/22
console.log("--- Day 22: Reactor Reboot ---");
const smallFile = `${__dirname}/data/basic.txt`;
const testFile = `${__dirname}/data/example.txt`;
const test2File = `${__dirname}/data/example2.txt`;
const realFile = `${__dirname}/data/input.txt`;

doCubeControlPart1(smallFile).then((result) =>
  console.log(`Part One Basic: ${result}`)
); // 39
doCubeControlPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 590784
doCubeControlPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 620241

doCubeControlPart2(test2File).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 2758514936282235
doCubeControlPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 1284561759639324
