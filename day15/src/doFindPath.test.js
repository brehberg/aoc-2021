const { doFindPathPart1 } = require("./doFindPath.js");
const { doFindPathPart2 } = require("./doFindPath.js");

describe("Day 15: Chiton", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doFindPathPart1(testFile);
    const expectedResult = 40;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doFindPathPart2(testFile);
    const expectedResult = 315;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doFindPathPart1(realFile);
    const expectedResult = 441;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doFindPathPart2(realFile);
    const expectedResult = 2849;
    expect(result).toEqual(expectedResult);
  });
});
