const { readRoomDiagram } = require("./readRoomDiagram.js");
const { processRoomDiagram } = require("./processRoomDiagram.js");

async function doPart1(fileName) {
  const data = await readRoomDiagram(fileName);
  return processRoomDiagram(data, true);
}
exports.doOrganizeAmphipodsPart1 = doPart1;

async function doPart2(fileName) {
  const data = await readRoomDiagram(fileName);
  return processRoomDiagram(data);
}
exports.doOrganizeAmphipodsPart2 = doPart2;
