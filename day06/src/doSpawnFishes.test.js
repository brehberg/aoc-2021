const { doSpawnFishesPart1 } = require("./doSpawnFishes.js");
const { doSpawnFishesPart2 } = require("./doSpawnFishes.js");

describe("Day 6: Lanternfish", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doSpawnFishesPart1(testFile);
    const expectedResult = 5934;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doSpawnFishesPart2(testFile);
    const expectedResult = 26984457539;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doSpawnFishesPart1(realFile);
    const expectedResult = 380612;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doSpawnFishesPart2(realFile);
    const expectedResult = 1710166656900;
    expect(result).toEqual(expectedResult);
  });
});
