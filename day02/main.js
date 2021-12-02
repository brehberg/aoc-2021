const { doDivePart1, doDivePart2 } = require("./src/doDive.js");
// https://adventofcode.com/2021/day/2

doDivePart1("./data/example.txt").then((result) =>
  console.log(`Part One: Example: ${result}`)
); // 150
doDivePart1("./data/input.txt").then((result) =>
  console.log(`Part One: Answer: ${result}`)
); // 1648020

doDivePart2("./data/example.txt").then((result) =>
  console.log(`Part Two: Example: ${result}`)
); // 900
doDivePart2("./data/input.txt").then((result) =>
  console.log(`Part Two: Answer: ${result}`)
); // 1759818555
