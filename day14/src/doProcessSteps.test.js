const { doProcessStepsPart1 } = require("./doProcessSteps.js");
const { doProcessStepsPart2 } = require("./doProcessSteps.js");

describe("Day 14: Extended Polymerization", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doProcessStepsPart1(testFile);
    const expectedResult = 1588;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doProcessStepsPart2(testFile);
    const expectedResult = 2188189693529;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doProcessStepsPart1(realFile);
    const expectedResult = 3906;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doProcessStepsPart2(realFile);
    const expectedResult = 4441317262452;
    expect(result).toEqual(expectedResult);
  });
});
