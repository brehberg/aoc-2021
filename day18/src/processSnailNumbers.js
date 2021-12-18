function processSnailNumbers(snailNumbers, findLargest = false) {
  // part 1 add all the numbers to calculate magnitude
  if (!findLargest) {
    const total = new NumPair(snailNumbers.shift());
    snailNumbers.forEach((number) => {
      total.add(new NumPair(number));
    });
    return total.magnitude();
  }
  // part 2 find two numbers that have largest magnitute
  let largest = -Infinity;
  for (const number1 of snailNumbers) {
    for (const number2 of snailNumbers) {
      const pair1 = new NumPair(number1);
      const pair2 = new NumPair(number2);
      pair1.add(new NumPair(number2));
      pair2.add(new NumPair(number1));
      largest = Math.max(largest, pair1.magnitude(), pair2.magnitude());
    }
  }
  return largest;
}
exports.processSnailNumbers = processSnailNumbers;

class NumPair {
  left = 0;
  right = 0;
  constructor(input) {
    this.left = input[0] instanceof Array ? new NumPair(input[0]) : input[0];
    this.right = input[1] instanceof Array ? new NumPair(input[1]) : input[1];
  }
  print() {
    return (
      "[" +
      (this.left instanceof NumPair ? this.left.print() : this.left) +
      "," +
      (this.right instanceof NumPair ? this.right.print() : this.right) +
      "]"
    );
  }
  magnitude() {
    return (
      3 * (this.left instanceof NumPair ? this.left.magnitude() : this.left) +
      2 * (this.right instanceof NumPair ? this.right.magnitude() : this.right)
    );
  }
  add(additionalPair) {
    this.left = new NumPair([this.left, this.right]);
    this.right = additionalPair;
    let reduced = false;
    while (!reduced) {
      let changed = this.reduceExplode();
      if (changed) continue;
      changed = this.reduceSplit();
      if (changed) continue;
      reduced = true;
    }
  }
  reduceSplit() {
    let split = false;
    // split left side if 10 or greater
    if (this.left instanceof NumPair) {
      split = this.left.reduceSplit();
    } else if (this.left >= 10) {
      this.left = new NumPair([
        Math.floor(this.left / 2),
        Math.ceil(this.left / 2),
      ]);
      split = true;
    }
    if (split) return split;
    // split right side if 10 or greater
    if (this.right instanceof NumPair) {
      split = this.right.reduceSplit();
    } else if (this.right >= 10) {
      this.right = new NumPair([
        Math.floor(this.right / 2),
        Math.ceil(this.right / 2),
      ]);
      split = true;
    }
    return split;
  }
  reduceExplode(depth = 1) {
    // explode left side if nested in four pairs
    if (this.left instanceof NumPair) {
      if (depth === 4) {
        const pair = this.left;
        this.left = 0;
        return this.explodeLeft(pair);
      }
      const exploded = this.left.reduceExplode(depth + 1);
      if (exploded) {
        return this.explodeLeft(exploded);
      }
    }
    // explode right side if nested in four pairs
    if (this.right instanceof NumPair) {
      if (depth === 4) {
        const pair = this.right;
        this.right = 0;
        return this.explodeRight(pair);
      }
      const exploded = this.right.reduceExplode(depth + 1);
      if (exploded) {
        return this.explodeRight(exploded);
      }
    }
  }
  explodeLeft(pair) {
    this.right instanceof NumPair
      ? this.right.pushLeft(pair.right)
      : (this.right += pair.right);
    pair.right = 0;
    return pair;
  }
  explodeRight(pair) {
    this.left instanceof NumPair
      ? this.left.pushRight(pair.left)
      : (this.left += pair.left);
    pair.left = 0;
    return pair;
  }
  pushLeft(number) {
    this.left instanceof NumPair
      ? this.left.pushLeft(number)
      : (this.left += number);
  }
  pushRight(number) {
    this.right instanceof NumPair
      ? this.right.pushRight(number)
      : (this.right += number);
  }
}
exports.NumPair = NumPair;
