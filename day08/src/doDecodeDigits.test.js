const { doDecodeDigitsPart1 } = require("./doDecodeDigits.js");
const { doDecodeDigitsPart2 } = require("./doDecodeDigits.js");

describe("Day 8: Seven Segment Search", () => {
  const otherFile = `${__dirname}/../data/basic.txt`;
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check basic data", async () => {
    const result = await doDecodeDigitsPart1(otherFile);
    const expectedResult = 0;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check basic data", async () => {
    const result = await doDecodeDigitsPart2(otherFile);
    const expectedResult = 5353;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check example data", async () => {
    const result = await doDecodeDigitsPart1(testFile);
    const expectedResult = 26;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doDecodeDigitsPart2(testFile);
    const expectedResult = 61229;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doDecodeDigitsPart1(realFile);
    const expectedResult = 237;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doDecodeDigitsPart2(realFile);
    const expectedResult = 1009098;
    expect(result).toEqual(expectedResult);
  });
});
