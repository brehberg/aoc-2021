const { doImageEnhancementPart1 } = require("./doImageEnhancement.js");
const { doImageEnhancementPart2 } = require("./doImageEnhancement.js");

describe("Day 20: Trench Map", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doImageEnhancementPart1(testFile);
    const expectedResult = 35;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doImageEnhancementPart2(testFile);
    const expectedResult = 3351;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doImageEnhancementPart1(realFile);
    const expectedResult = 5479;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doImageEnhancementPart2(realFile);
    const expectedResult = 19012;
    expect(result).toEqual(expectedResult);
  });
});
