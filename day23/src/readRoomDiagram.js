const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readRoomDiagram(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someRoomDiagram = {
    hallway: [],
    rooms: Array(4)
      .fill()
      .map((_) => []),
  };
  for await (const line of file) {
    const splitLine = line
      .trim()
      .split(/#+/)
      .filter((str) => str);
    splitLine.length === 1 &&
      someRoomDiagram.hallway.push(...splitLine[0].split(""));
    splitLine.length === 4 &&
      splitLine.forEach((pod, i) => someRoomDiagram.rooms[i].push(pod));
  }
  return someRoomDiagram;
}
exports.readRoomDiagram = readRoomDiagram;
