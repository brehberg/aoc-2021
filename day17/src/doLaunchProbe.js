const { readTargetArea } = require("./readTargetArea.js");
const { processTargetArea } = require("./processTargetArea.js");

async function doPart1(fileName) {
  const data = await readTargetArea(fileName);
  return processTargetArea(data).height;
}
exports.doLaunchProbePart1 = doPart1;

async function doPart2(fileName) {
  const data = await readTargetArea(fileName);
  return processTargetArea(data).count;
}
exports.doLaunchProbePart2 = doPart2;
