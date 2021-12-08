const { doDecodeDigitsPart1 } = require("./src/doDecodeDigits.js");
const { doDecodeDigitsPart2 } = require("./src/doDecodeDigits.js");

// https://adventofcode.com/2021/day/8
console.log("--- Day 8: Seven Segment Search ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;
const otherFile = `${__dirname}/data/basic.txt`;

doDecodeDigitsPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 26
doDecodeDigitsPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 237

doDecodeDigitsPart2(otherFile).then((result) =>
  console.log(`Part Two Basic: ${result}`)
); // 5353
doDecodeDigitsPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 61229
doDecodeDigitsPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 1009098
