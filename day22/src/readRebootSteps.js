const { createReadStream } = require("fs");
const { createInterface } = require("readline");

async function readRebootSteps(fileName) {
  const file = createInterface({
    input: createReadStream(fileName),
    crlfDelay: Infinity,
  });
  const someRebootSteps = [];
  for await (const line of file) {
    const regexMatch = line
      .trim()
      .match(
        /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/
      );
    regexMatch &&
      someRebootSteps.push({
        action: regexMatch[1].trim(),
        x: { min: Number(regexMatch[2]), max: Number(regexMatch[3]) },
        y: { min: Number(regexMatch[4]), max: Number(regexMatch[5]) },
        z: { min: Number(regexMatch[6]), max: Number(regexMatch[7]) },
      });
  }
  return someRebootSteps;
}
exports.readRebootSteps = readRebootSteps;
