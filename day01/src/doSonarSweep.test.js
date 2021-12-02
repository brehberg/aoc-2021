const { doSonarSweepPart1 } = require("./doSonarSweep.js");
const { doSonarSweepPart2 } = require("./doSonarSweep.js");

describe("Day 1: Sonar Sweep", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doSonarSweepPart1(testFile);
    const expectedResult = 7;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doSonarSweepPart2(testFile);
    const expectedResult = 5;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doSonarSweepPart1(realFile);
    const expectedResult = 1557;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doSonarSweepPart2(realFile);
    const expectedResult = 1608;
    expect(result).toEqual(expectedResult);
  });
});
