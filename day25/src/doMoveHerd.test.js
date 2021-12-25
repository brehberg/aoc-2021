const { doMoveHerdPart1 } = require("./doMoveHerd.js");
const { doMoveHerdPart2 } = require("./doMoveHerd.js");

describe("Day 25: Sea Cucumber", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doMoveHerdPart1(testFile);
    const expectedResult = 58;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doMoveHerdPart1(realFile);
    const expectedResult = 380;
    expect(result).toEqual(expectedResult);
  });
});
