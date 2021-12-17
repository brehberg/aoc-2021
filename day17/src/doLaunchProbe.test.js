const { doLaunchProbePart1 } = require("./doLaunchProbe.js");
const { doLaunchProbePart2 } = require("./doLaunchProbe.js");

describe("Day 17: Trick Shot", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doLaunchProbePart1(testFile);
    const expectedResult = 45;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doLaunchProbePart2(testFile);
    const expectedResult = 112;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doLaunchProbePart1(realFile);
    const expectedResult = 2278;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doLaunchProbePart2(realFile);
    const expectedResult = 996;
    expect(result).toEqual(expectedResult);
  });
});
