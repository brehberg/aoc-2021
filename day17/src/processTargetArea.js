function processTargetArea(targetArea, findCount = false) {
  const result = { x: 0, y: 0, height: -Infinity, count: 0 };
  // approximation for finding inverse of triangle number
  const xStart = Math.floor(Math.sqrt(2 * targetArea.xMin));

  for (let x = xStart; x <= targetArea.xMax; x++) {
    for (let y = -targetArea.yMin; y >= targetArea.yMin; y--) {
      let h = fireShot(x, y, targetArea);
      if (h !== -Infinity) result.count++;
      if (h > result.height) {
        result.height = h;
        result.x = x;
        result.y = y;
        if (!findCount) return result;
      }
    }
  }
  return result;
}
exports.processTargetArea = processTargetArea;

const fireShot = (xVelocity, yVelocity, target) => {
  const probe = { x: 0, y: 0 };
  let maxHeight = -Infinity;

  while (probe.x < target.xMax && probe.y > target.yMin) {
    probe.x += xVelocity;
    probe.y += yVelocity;
    maxHeight = Math.max(maxHeight, probe.y);
    if (xVelocity > 0) xVelocity -= 1;
    if (xVelocity < 0) xVelocity += 1;
    yVelocity -= 1;

    if (
      probe.x >= target.xMin &&
      probe.x <= target.xMax &&
      probe.y >= target.yMin &&
      probe.y <= target.yMax
    ) {
      return maxHeight; // probe hit target
    }
  }
  return -Infinity; // probe overshot target
};
