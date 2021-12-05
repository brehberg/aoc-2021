const { doVentMappingPart1 } = require("./src/doVentMapping.js");
const { doVentMappingPart2 } = require("./src/doVentMapping.js");

console.log("--- Day 5: Hydrothermal Venture ---"); // https://adventofcode.com/2021/day/5
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doVentMappingPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 5
doVentMappingPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 6572

doVentMappingPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 12
doVentMappingPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 21466
