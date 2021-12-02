const { doDivePart1 } = require("./doDive.js");
const { doDivePart2 } = require("./doDive.js");

describe("Day 2: Dive!", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doDivePart1(testFile);
    const expectedResult = 150;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doDivePart2(testFile);
    const expectedResult = 900;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doDivePart1(realFile);
    const expectedResult = 1648020;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doDivePart2(realFile);
    const expectedResult = 1759818555;
    expect(result).toEqual(expectedResult);
  });
});
