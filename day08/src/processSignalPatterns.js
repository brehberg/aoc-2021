function countEasyOutputValues(input) {
  return input.reduce((sum, row) => sum + countDigits(row.outputValues), 0);
}
exports.countEasyOutputValues = countEasyOutputValues;

function countDigits(values) {
  // the easy values 1, 4, 7, and 8 each have unique segment lengths
  return values.filter((val) => [2, 4, 3, 7].includes(val.length)).length;
}

function processSignalPatterns(inputData) {
  return inputData.reduce((sum, entry) => sum + determineNumber(entry), 0);
}
exports.processSignalPatterns = processSignalPatterns;

function determineNumber(signal) {
  const number = [];
  const patternMap = determineDigitPatterns(signal.uniquePatterns);
  for (const value of signal.outputValues) {
    const sortedValue = value.split("").sort().join("");
    number.push(patternMap.indexOf(sortedValue));
  }
  return parseInt(number.join(""));
}

function determineDigitPatterns(uniqueSignalPatterns) {
  const digits = Array(10);
  const ofSize = { five: [], six: [] };

  for (const signal of uniqueSignalPatterns) {
    // start by splitting patterns into chars and getting the easy digits
    const [pattern, patternSize] = [signal.split(""), signal.length];
    if (patternSize === 2) digits[1] = pattern;
    else if (patternSize === 3) digits[7] = pattern;
    else if (patternSize === 4) digits[4] = pattern;
    else if (patternSize === 7) digits[8] = pattern;
    // length 5 could be patterns for digits 2, 3, or 5
    else if (patternSize === 5) ofSize.five.push(pattern);
    // length 6 could be patterns for digits 6, 9 or 0
    else if (patternSize === 6) ofSize.six.push(pattern);
  }

  // top-right segment is part of digits 1, 9, and 0 but not part of 6
  const topRight = findUniqueSegment(digits[1], ofSize.six);

  // top-right segment is part of digits 9 and 0 but not part of 6
  digits[6] = ofSize.six.find((digit) => !digit.includes(topRight));
  ofSize.six.splice(ofSize.six.indexOf(digits[6]), 1);

  // top-right segment is part of digits 2 and 3 but not part of 5
  digits[5] = ofSize.five.find((digit) => !digit.includes(topRight));
  ofSize.five.splice(ofSize.five.indexOf(digits[5]), 1);

  // bottom-right segment is part of digit 1 that is not top-right
  const bottomRight = digits[1].find((segment) => segment !== topRight);

  // bottom-right segment is part of digit 3 and not part of 2
  digits[3] = ofSize.five.find((digit) => digit.includes(bottomRight));
  digits[2] = ofSize.five.find((digit) => !digit.includes(bottomRight));

  // center segment is part of digits 4 and 9 but not part of 0
  const center = findUniqueSegment(digits[4], ofSize.six);

  // center segment is part of digit 9 and not part of 0
  digits[9] = ofSize.six.find((digit) => digit.includes(center));
  digits[0] = ofSize.six.find((digit) => !digit.includes(center));

  return digits.map((value) => value.sort().join(""));
}

function findUniqueSegment(fromDigit, setOfDigits) {
  const [set, len] = [setOfDigits.flat(), setOfDigits.length];
  return fromDigit.find(
    (segment) => set.filter((value) => value === segment).length !== len
  );
}
