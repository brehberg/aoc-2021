const { doPlayGamePart1 } = require("./doPlayGame.js");
const { doPlayGamePart2 } = require("./doPlayGame.js");

describe("Day 21: Dirac Dice", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doPlayGamePart1(testFile);
    const expectedResult = 739785;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doPlayGamePart2(testFile);
    const expectedResult = 444356092776315;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doPlayGamePart1(realFile);
    const expectedResult = 679329;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doPlayGamePart2(realFile);
    const expectedResult = 433315766324816;
    expect(result).toEqual(expectedResult);
  });
});
