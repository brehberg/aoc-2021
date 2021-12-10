const { doDecodeSyntaxPart1 } = require("./src/doDecodeSyntax.js");
const { doDecodeSyntaxPart2 } = require("./src/doDecodeSyntax.js");

// https://adventofcode.com/2021/day/10
console.log("--- Day 10: Syntax Scoring ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doDecodeSyntaxPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 26397
doDecodeSyntaxPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 392043

doDecodeSyntaxPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 288957
doDecodeSyntaxPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 1605968119
