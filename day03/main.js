const { doBinaryDiagnosticPart1 } = require("./src/doBinaryDiagnostic.js");
const { doBinaryDiagnosticPart2 } = require("./src/doBinaryDiagnostic.js");

console.log("--- Day 3: Binary Diagnostic ---"); // https://adventofcode.com/2021/day/3
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doBinaryDiagnosticPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 198
doBinaryDiagnosticPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 3148794

doBinaryDiagnosticPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 230
doBinaryDiagnosticPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 2795310
