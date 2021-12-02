function processValues(values, offset = 1) {
  let larger = 0;
  values.slice(offset).forEach((current, index) => {
    if (current > values[index]) larger++;
  });
  return larger;
}
exports.processValues = processValues;
