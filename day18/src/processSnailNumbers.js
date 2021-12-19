function processSnailNumbers(snailNumbers, findLargest = false) {
  // part 1 add all the numbers to calculate magnitude
  if (!findLargest) {
    const total = new NumberPair(snailNumbers.shift());
    snailNumbers.forEach((number) => {
      total.add(new NumberPair(number));
    });
    return total.magnitude();
  }
  // part 2 find two numbers that have largest magnitute
  let largest = -Infinity;
  for (const number1 of snailNumbers) {
    for (const number2 of snailNumbers) {
      const pair1 = new NumberPair(number1);
      const pair2 = new NumberPair(number2);
      pair1.add(new NumberPair(number2));
      pair2.add(new NumberPair(number1));
      largest = Math.max(largest, pair1.magnitude(), pair2.magnitude());
    }
  }
  return largest;
}
exports.processSnailNumbers = processSnailNumbers;

class NumberPair {
  left = 0;
  right = 0;
  constructor(input) {
    if (input.length !== 2) return;
    const handleInput = (value) => {
      return Array.isArray(value)
        ? new NumberPair(value)
        : Number.isInteger(value)
        ? new RawNumber(value)
        : value;
    };
    this.left = handleInput(input[0]);
    this.right = handleInput(input[1]);
  }
  toString() {
    return "[" + this.left.toString() + "," + this.right.toString() + "]";
  }
  magnitude() {
    return 3 * this.left.magnitude() + 2 * this.right.magnitude();
  }
  add(additionalPair) {
    this.left = new NumberPair([this.left, this.right]);
    this.right = additionalPair;
    while (true) {
      if (this.reduceExplode()) continue;
      if (this.reduceSplit()) continue;
      break;
    }
  }
  reduceSplit() {
    // split left side if 10 or greater
    const splitLeft = this.left.reduceSplit();
    if (splitLeft instanceof NumberPair) this.left = splitLeft;
    if (splitLeft) return true;
    // split right side if 10 or greater
    const splitRight = this.right.reduceSplit();
    if (splitRight instanceof NumberPair) this.right = splitRight;
    if (splitRight) return true;
    return false;
  }
  reduceExplode(depth = 1) {
    // explode left side if nested in four pairs
    if (this.left instanceof NumberPair) {
      if (depth === 4) {
        const nested = this.left;
        this.left = new RawNumber(0);
        return this.explodeLeft(nested);
      }
      const exploded = this.left.reduceExplode(depth + 1);
      if (exploded) return this.explodeLeft(exploded);
    }
    // explode right side if nested in four pairs
    if (this.right instanceof NumberPair) {
      if (depth === 4) {
        const nested = this.right;
        this.right = new RawNumber(0);
        return this.explodeRight(nested);
      }
      const exploded = this.right.reduceExplode(depth + 1);
      if (exploded) return this.explodeRight(exploded);
    }
  }
  explodeLeft(pair) {
    this.right.pushLeft(pair.right.value);
    pair.right = new RawNumber(0);
    return pair;
  }
  explodeRight(pair) {
    this.left.pushRight(pair.left.value);
    pair.left = new RawNumber(0);
    return pair;
  }
  pushLeft(number) {
    this.left.pushLeft(number);
  }
  pushRight(number) {
    this.right.pushRight(number);
  }
}
exports.NumberPair = NumberPair;

class RawNumber {
  value = 0;
  constructor(input) {
    this.value = input;
  }
  toString() {
    return this.value;
  }
  magnitude() {
    return this.value;
  }
  reduceSplit() {
    if (this.value < 10) return false;
    const half = this.value / 2;
    return new NumberPair([Math.floor(half), Math.ceil(half)]);
  }
  pushLeft(number) {
    this.value += number;
  }
  pushRight(number) {
    this.value += number;
  }
}
