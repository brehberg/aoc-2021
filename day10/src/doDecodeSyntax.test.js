const { doDecodeSyntaxPart1 } = require("./doDecodeSyntax.js");
const { doDecodeSyntaxPart2 } = require("./doDecodeSyntax.js");

describe("Day 10: Syntax Scoring", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doDecodeSyntaxPart1(testFile);
    const expectedResult = 26397;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doDecodeSyntaxPart2(testFile);
    const expectedResult = 288957;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doDecodeSyntaxPart1(realFile);
    const expectedResult = 392043;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doDecodeSyntaxPart2(realFile);
    const expectedResult = 1605968119;
    expect(result).toEqual(expectedResult);
  });
});
