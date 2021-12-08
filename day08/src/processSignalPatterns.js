function countEasyOutputValues(input) {
  return input.reduce((sum, row) => sum + countDigits(row.outputValues), 0);
}
exports.countEasyOutputValues = countEasyOutputValues;

function processSignalPatterns(inputData) {
  return inputData.reduce((sum, entry) => sum + determineNumber(entry), 0);
}
exports.processSignalPatterns = processSignalPatterns;

function countDigits(values) {
  // the easy values 1, 4, 7, and 8 each have unique segment lengths
  return values.filter((val) => [2, 4, 3, 7].includes(val.length)).length;
}

function determineNumber(signal) {
  const number = [];
  const patternMap = determineDigitPatterns(signal.uniquePatterns);
  for (const value of signal.outputValues) {
    const sortedValue = value.split("").sort().join("");
    number.push(patternMap.indexOf(sortedValue));
  }
  return parseInt(number.join(""));
}

function determineDigitPatterns(patterns) {
  const [segments, digits] = [Array(7), Array(10)];
  const ofLength = { five: [], six: [] };

  // start by getting the unique digits and split patterns into chars
  for (const pattern of patterns) {
    if (pattern.length === 2) digits[1] = pattern.split("");
    else if (pattern.length === 3) digits[7] = pattern.split("");
    else if (pattern.length === 4) digits[4] = pattern.split("");
    else if (pattern.length === 7) digits[8] = pattern.split("");
    // length 5 could be patterns for value 2, 3, or 5
    else if (pattern.length === 5) ofLength.five.push(pattern.split(""));
    // length 6 could be patterns for value0, 6, or 9
    else if (pattern.length === 6) ofLength.six.push(pattern.split(""));
  }

  // segment 0 is part of digit 7 and not part of 1
  segments[0] = digits[7].filter((c) => !digits[1].includes(c))[0];

  // segment 2 is part of digits 1, 0, and 9 but not part of 6
  segments[2] = digits[1].filter(
    (c) => ofLength.six.flat().filter((v) => v === c).length !== 3
  )[0];

  // segment 2 is part of digits 0 and 9 but not part of 6
  digits[6] = ofLength.six.filter((p) => !p.includes(segments[2]))[0];
  ofLength.six.splice(ofLength.six.indexOf(digits[6]), 1);

  // segment 2 is part of digits 2 and 3 but not part of 5
  digits[5] = ofLength.five.filter((p) => !p.includes(segments[2]))[0];
  ofLength.five.splice(ofLength.five.indexOf(digits[5]), 1);

  // segment 5 is part of digit 1 that is not the segment 2
  segments[5] = digits[1].filter((c) => c !== segments[2])[0];

  // segment 5 is part of digit 3 and not part of 2
  digits[2] = ofLength.five.filter((p) => !p.includes(segments[5]))[0];
  digits[3] = ofLength.five.filter((p) => p.includes(segments[5]))[0];

  // segment 3 is part of digits 4 and 9 but not part of 0
  segments[3] = digits[4].filter(
    (c) => ofLength.six.flat().filter((v) => v === c).length !== 2
  )[0];

  // segment 3 is part of digit 9 and not part of 0
  digits[9] = ofLength.six.filter((p) => p.includes(segments[3]))[0];
  digits[0] = ofLength.six.filter((p) => !p.includes(segments[3]))[0];

  // segment 1 is part of digit 4 that is not segment 2, 3, or 5
  segments[1] = digits[4].filter(
    (c) => ![segments[2], segments[3], segments[5]].includes(c)
  )[0];

  return digits.map((value) => value.sort().join(""));
}
