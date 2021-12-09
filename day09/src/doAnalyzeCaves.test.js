const { doAnalyzeCavesPart1 } = require("./doAnalyzeCaves.js");
const { doAnalyzeCavesPart2 } = require("./doAnalyzeCaves.js");

describe("Day 9: Smoke Basin", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doAnalyzeCavesPart1(testFile);
    const expectedResult = 15;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doAnalyzeCavesPart2(testFile);
    const expectedResult = 1134;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doAnalyzeCavesPart1(realFile);
    const expectedResult = 530;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doAnalyzeCavesPart2(realFile);
    const expectedResult = 1019494;
    expect(result).toEqual(expectedResult);
  });
});
