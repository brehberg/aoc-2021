const { doBingoSimulationPart1 } = require("./src/doBingoSimulation.js");
const { doBingoSimulationPart2 } = require("./src/doBingoSimulation.js");

console.log("--- Day 4: Giant Squid ---"); // https://adventofcode.com/2021/day/4
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doBingoSimulationPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 4512
doBingoSimulationPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 58412

doBingoSimulationPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 1924
doBingoSimulationPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 10030
