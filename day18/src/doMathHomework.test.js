const { doMathHomeworkPart1 } = require("./doMathHomework.js");
const { doMathHomeworkPart2 } = require("./doMathHomework.js");
const { NumPair } = require("./processSnailNumbers.js");
const { readSnailNumbers } = require("./readSnailNumbers.js");

describe("Sailfish NumPair Class", () => {
  const doPrintMethod = (input) => {
    const test = new NumPair(JSON.parse(input));
    return test.print();
  };

  test("Print value 1", async () => {
    const result = doPrintMethod("[1,2]");
    const expectedResult = "[1,2]";
    expect(result).toEqual(expectedResult);
  });

  test("Print value 2", async () => {
    const result = doPrintMethod("[[3,4],5]");
    const expectedResult = "[[3,4],5]";
    expect(result).toEqual(expectedResult);
  });

  test("Print value 3", async () => {
    const result = doPrintMethod(
      "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]"
    );
    const expectedResult =
      "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]";
    expect(result).toEqual(expectedResult);
  });

  const doAddMethod = (inputList) => {
    const test = new NumPair(JSON.parse(inputList.shift()));
    inputList.forEach((number) => {
      const additional = new NumPair(JSON.parse(number));
      test.add(additional);
    });
    return test.print();
  };

  test("Add values 1", async () => {
    const result = doAddMethod(["[1, 2]", "[[3,4],5]"]);
    const expectedResult = "[[1,2],[[3,4],5]]";
    expect(result).toEqual(expectedResult);
  });

  test("Add value 2", async () => {
    const result = doAddMethod(["[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"]);
    const expectedResult = "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]";
    expect(result).toEqual(expectedResult);
  });

  test("Add value 3", async () => {
    const result = doAddMethod(["[1,1]", "[2,2]", "[3,3]", "[4,4]"]);
    const expectedResult = "[[[[1,1],[2,2]],[3,3]],[4,4]]";
    expect(result).toEqual(expectedResult);
  });

  test("Add value 4", async () => {
    const result = doAddMethod(["[[[[1,1],[2,2]],[3,3]],[4,4]]", "[5,5]"]);
    const expectedResult = "[[[[3,0],[5,3]],[4,4]],[5,5]]";
    expect(result).toEqual(expectedResult);
  });

  test("Add value 5", async () => {
    const result = doAddMethod(["[[[[3,0],[5,3]],[4,4]],[5,5]]", "[6,6]"]);
    const expectedResult = "[[[[5,0],[7,4]],[5,5]],[6,6]]";
    expect(result).toEqual(expectedResult);
  });

  test("Add value list", async () => {
    const testData = await readSnailNumbers(`${__dirname}/../data/test.txt`);
    const total = new NumPair(testData.shift());
    testData.forEach((number) => {
      total.add(new NumPair(number));
    });
    const result = total.print();
    const expectedResult =
      "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]";
    expect(result).toEqual(expectedResult);
  });

  const doReduceMethod = (input) => {
    const test = new NumPair(JSON.parse(input));
    const changed = test.reduceExplode();
    if (!changed) test.reduceSplit();
    return test.print();
  };

  test("Explode value 1", async () => {
    const result = doReduceMethod("[[[[[9,8],1],2],3],4]");
    const expectedResult = "[[[[0,9],2],3],4]";
    expect(result).toEqual(expectedResult);
  });

  test("Explode value 2", async () => {
    const result = doReduceMethod("[7,[6,[5,[4,[3,2]]]]]");
    const expectedResult = "[7,[6,[5,[7,0]]]]";
    expect(result).toEqual(expectedResult);
  });

  test("Explode value 3", async () => {
    const result = doReduceMethod("[[6,[5,[4,[3,2]]]],1]");
    const expectedResult = "[[6,[5,[7,0]]],3]";
    expect(result).toEqual(expectedResult);
  });

  test("Explode value 4", async () => {
    const result = doReduceMethod("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]");
    const expectedResult = "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]";
    expect(result).toEqual(expectedResult);
  });

  test("Explode value 5", async () => {
    const result = doReduceMethod("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]");
    const expectedResult = "[[3,[2,[8,0]]],[9,[5,[7,0]]]]";
    expect(result).toEqual(expectedResult);
  });

  test("Explode value 6a", async () => {
    const result = doReduceMethod("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]");
    const expectedResult = "[[[[0,7],4],[7,[[8,4],9]]],[1,1]]";
    expect(result).toEqual(expectedResult);
  });

  test("Explode value 6b", async () => {
    const result = doReduceMethod("[[[[0,7],4],[7,[[8,4],9]]],[1,1]]");
    const expectedResult = "[[[[0,7],4],[15,[0,13]]],[1,1]]";
    expect(result).toEqual(expectedResult);
  });

  test("Split value 6c", async () => {
    const result = doReduceMethod("[[[[0,7],4],[15,[0,13]]],[1,1]]");
    const expectedResult = "[[[[0,7],4],[[7,8],[0,13]]],[1,1]]";
    expect(result).toEqual(expectedResult);
  });

  test("Split value 6d", async () => {
    const result = doReduceMethod("[[[[0,7],4],[[7,8],[0,13]]],[1,1]]");
    const expectedResult = "[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]";
    expect(result).toEqual(expectedResult);
  });

  test("Explode value 6e", async () => {
    const result = doReduceMethod("[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]");
    const expectedResult = "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]";
    expect(result).toEqual(expectedResult);
  });

  const doAMagnitudeMethod = (input) => {
    const test = new NumPair(JSON.parse(input));
    return test.magnitude();
  };

  test("Magnitude value 1", async () => {
    const result = doAMagnitudeMethod("[[1,2],[[3,4],5]]");
    const expectedResult = 143;
    expect(result).toEqual(expectedResult);
  });

  test("Magnitude value 2", async () => {
    const result = doAMagnitudeMethod("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
    const expectedResult = 1384;
    expect(result).toEqual(expectedResult);
  });

  test("Magnitude value 3", async () => {
    const result = doAMagnitudeMethod(
      "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"
    );
    const expectedResult = 3488;
    expect(result).toEqual(expectedResult);
  });
});

describe("Day 18: Snailfish", () => {
  const testFile = `${__dirname}/../data/example.txt`;
  const realFile = `${__dirname}/../data/input.txt`;

  test("Part One: check example data", async () => {
    const result = await doMathHomeworkPart1(testFile);
    const expectedResult = 4140;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check example data", async () => {
    const result = await doMathHomeworkPart2(testFile);
    const expectedResult = 3993;
    expect(result).toEqual(expectedResult);
  });

  test("Part One: check actual data", async () => {
    const result = await doMathHomeworkPart1(realFile);
    const expectedResult = 4017;
    expect(result).toEqual(expectedResult);
  });

  test("Part Two: check actual data", async () => {
    const result = await doMathHomeworkPart2(realFile);
    const expectedResult = 4583;
    expect(result).toEqual(expectedResult);
  });
});
