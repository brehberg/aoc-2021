function processMonadProgram(sourceCode, inputData, doPrint) {
  if (inputData !== Infinity && inputData !== -Infinity) {
    // for simple programs use the simulated ALU
    const alu = new ALU(inputData);
    return alu.executeCode(sourceCode);
  }

  const parameterSets = [];
  for (let index = 0; index < sourceCode.length - 16; index++) {
    if (sourceCode[index][0] !== "inp") continue;
    parameterSets.push({
      divZ: Number(sourceCode[index + 4][2]),
      addX: Number(sourceCode[index + 5][2]),
      addY: Number(sourceCode[index + 15][2]),
    });
  }

  // https://www.reddit.com/r/adventofcode/comments/rnejv5/comment/hpsv5hl
  const magicRepeatingFunction = (params, z, w) => {
    // based on code analysis, this function is performed on each input
    return (z % 26) + params.addX !== w
      ? Math.floor(z / params.divZ) * 26 + w + params.addY
      : Math.floor(z / params.divZ);
  };

  const zComparison =
    inputData === Infinity // find the largest MONAD number
      ? (newZ, oldZ, digit) => {
          return Math.max(newZ, oldZ * 10 + digit);
        }
      : inputData === -Infinity // find the smallest MONAD number
      ? (newZ, oldZ, digit) => {
          return Math.min(newZ, oldZ * 10 + digit);
        }
      : undefined;

  let zValues = { 0: 0 };
  parameterSets.forEach((paramSet, digit) => {
    const newValues = {};
    for (const zOld in zValues) {
      for (let input = 1; input <= 9; input++) {
        const zNew = magicRepeatingFunction(paramSet, zOld, input);
        // skip if operation is 'contraction' and new Z value doesn't reduce
        if (paramSet.divZ === 26 && zNew >= zOld) continue;
        if (newValues[zNew] === undefined) {
          newValues[zNew] = zValues[zOld] * 10 + input;
          continue;
        }
        newValues[zNew] = zComparison(newValues[zNew], zValues[zOld], input);
      }
    }
    zValues = JSON.parse(JSON.stringify(newValues));
    doPrint &&
      console.log(
        `Digit ${digit + 1} total Z values: ${Object.keys(zValues).length}`
      );
  });
  // verify the value using simulated ALU
  const test = new ALU(zValues["0"].toString());
  if (test.executeCode(sourceCode).z === 0) return zValues["0"];
}
exports.processMonadProgram = processMonadProgram;

class ALU {
  w = 0;
  x = 0;
  y = 0;
  z = 0;
  constructor(dataStream) {
    this.data = dataStream.split("").reverse().map(Number);
  }
  executeCode(source) {
    for (const line of source) {
      this.runCommand(line);
    }
    return this.dumpRegisters();
  }
  runCommand(instruction) {
    const [op, reg, val] = instruction;
    const value = ["w", "x", "y", "z"].includes(val) ? this[val] : Number(val);
    if (op === "inp") {
      this[reg] = this.data.pop();
    } else if (op === "add") {
      this[reg] += value;
    } else if (op === "mul") {
      this[reg] *= value;
    } else if (op === "div") {
      this[reg] = parseInt(this[reg] / value);
    } else if (op === "mod") {
      this[reg] %= value;
    } else if (op === "eql") {
      this[reg] = Number(this[reg] === value);
    }
  }
  dumpRegisters() {
    return { w: this.w, x: this.x, y: this.y, z: this.z };
  }
}
