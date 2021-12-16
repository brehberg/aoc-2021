const { doDecodePacketsPart1 } = require("./src/doDecodePackets.js");
const { doDecodePacketsPart2 } = require("./src/doDecodePackets.js");

// https://adventofcode.com/2021/day/16
console.log("--- Day 16: Packet Decoder ---");
const testFile = `${__dirname}/data/example.txt`;
const realFile = `${__dirname}/data/input.txt`;

doDecodePacketsPart1(testFile).then((result) =>
  console.log(`Part One Example: ${result}`)
); // 31
doDecodePacketsPart1(realFile).then((result) =>
  console.log(`Part One Answer: ${result}`)
); // 963

doDecodePacketsPart2(testFile).then((result) =>
  console.log(`Part Two Example: ${result}`)
); // 54
doDecodePacketsPart2(realFile).then((result) =>
  console.log(`Part Two Answer: ${result}`)
); // 1549026292886
