const { doRunCodePart1 } = require("./doRunCode.js");
const { doRunCodePart2 } = require("./doRunCode.js");
const { readMonadProgram } = require("./readMonadProgram.js");
const { processMonadProgram } = require("./processMonadProgram.js");

describe("Day 24: Arithmetic Logic Unit", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("take an input number, negates it, and stores it in x", async () => {
    const code = [
      ["inp", "x"],
      ["mul", "x", "-1"],
    ];
    const result = processMonadProgram(code, "5").x;
    const expectedResult = -5;
    expect(result).toEqual(expectedResult);
  });

  test("takes two numbers, sets z to 1 if second is three times first", async () => {
    const code = [
      ["inp", "z"],
      ["inp", "x"],
      ["mul", "z", "3"],
      ["eql", "z", "x"],
    ];
    const result = processMonadProgram(code, "26").z;
    const expectedResult = 1;
    expect(result).toEqual(expectedResult);
  });

  test("takes a non-negative integer as input, converts it into binary", async () => {
    const data = await readMonadProgram(testFile);
    const out = processMonadProgram(data, "9");
    const result = Number(`${out.w}${out.x}${out.y}${out.z}`);
    const expectedResult = 1001;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doRunCodePart1(realFile);
    const expectedResult = 99429795993929;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doRunCodePart2(realFile);
    const expectedResult = 18113181571611;
    expect(result).toEqual(expectedResult);
  });
});
