const { doPathFindingPart1 } = require("./doPathFinding.js");
const { doPathFindingPart2 } = require("./doPathFinding.js");

describe("Day 12: Passage Pathing", () => {
  const smallFile = `${__dirname}/../data/example1.txt`;
  const basicFile = `${__dirname}/../data/example2.txt`;
  const testFile = `${__dirname}/../data/example3.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check basic data", async () => {
    const result = await doPathFindingPart1(smallFile);
    const expectedResult = 10;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check basic data", async () => {
    const result = await doPathFindingPart2(smallFile);
    const expectedResult = 36;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check example data", async () => {
    const result = await doPathFindingPart1(basicFile);
    const expectedResult = 19;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doPathFindingPart2(basicFile);
    const expectedResult = 103;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check larger data", async () => {
    const result = await doPathFindingPart1(testFile);
    const expectedResult = 226;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check larger data", async () => {
    const result = await doPathFindingPart2(testFile);
    const expectedResult = 3509;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doPathFindingPart1(realFile);
    const expectedResult = 4754;
    expect(result).toEqual(expectedResult);
  });
  
  test("Part Two: check actual data", async () => {
    const result = await doPathFindingPart2(realFile);
    const expectedResult = 143562;
    expect(result).toEqual(expectedResult);
  });
});
