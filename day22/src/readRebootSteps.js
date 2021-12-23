const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readRebootSteps(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someRebootSteps = [];
  for await (const line of file) {
    // expected line format: on x=10..12,y=10..12,z=10..12
    const splitLine = line.trim().split(/\s+/);
    const regexMatch = splitLine[1]
      .match(/x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/)
      .map(Number);
    regexMatch.length === 7 &&
      someRebootSteps.push({
        action: splitLine[0].toLowerCase(),
        x: { min: regexMatch[1], max: regexMatch[2] },
        y: { min: regexMatch[3], max: regexMatch[4] },
        z: { min: regexMatch[5], max: regexMatch[6] },
      });
  }
  return someRebootSteps;
}
exports.readRebootSteps = readRebootSteps;
