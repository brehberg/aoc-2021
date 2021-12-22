const { readRebootSteps } = require("./readRebootSteps.js");
const { processRebootSteps } = require("./processRebootSteps.js");

async function doPart1(fileName) {
  const data = await readRebootSteps(fileName);
  return processRebootSteps(data);
}
exports.doCubeControlPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readRebootSteps(fileName);
  return processRebootSteps(data, false);
}
exports.doCubeControlPart2 = doPart2;
