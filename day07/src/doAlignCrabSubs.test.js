const { doAlignCrabSubsPart1 } = require("./doAlignCrabSubs.js");
const { doAlignCrabSubsPart2 } = require("./doAlignCrabSubs.js");

describe("Day 7: The Treachery of Whales", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doAlignCrabSubsPart1(testFile);
    const expectedResult = 37;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doAlignCrabSubsPart2(testFile);
    const expectedResult = 168;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doAlignCrabSubsPart1(realFile);
    const expectedResult = 337488;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doAlignCrabSubsPart2(realFile);
    const expectedResult = 89647695;
    expect(result).toEqual(expectedResult);
  });
});
