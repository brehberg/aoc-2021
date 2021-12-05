const { readLineSegments } = require("./readLineSegments.js");
const { processLineSegments } = require("./processLineSegments.js");

async function doPart1(fileName) {
  const data = await readLineSegments(fileName);
  return processLineSegments(data);
}
exports.doVentMappingPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readLineSegments(fileName);
  return processLineSegments(data, true);
}
exports.doVentMappingPart2 = doPart2;
