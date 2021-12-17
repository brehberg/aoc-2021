function processTargetArea(targetArea) {
  const result = { x: 0, y: 0, height: -1, count: 0 };

  let xStart = 0;
  for (let i = 0; i <= targetArea.xMin; i++) {
    let xDist = findDistance(i);
    if (xDist >= targetArea.xMin) {
      xStart = i;
      break;
    }
  }

  for (let x = xStart; x <= targetArea.xMax; x++) {
    for (let y = targetArea.yMin; y < 0 - targetArea.yMin; y++) {
      let h = fireShot(x, y, targetArea);
      if (h !== -1) result.count++;
      if (h > result.height) {
        result.height = h;
        result.x = x;
        result.y = y;
      }
    }
  }

  return result;
}
exports.processTargetArea = processTargetArea;

const findDistance = (xVelocity) => {
  let xPosition = 0;
  while (xVelocity > 0) {
    xPosition += xVelocity;
    xVelocity -= 1;
  }
  return xPosition;
};

const fireShot = (xVelocity, yVelocity, target) => {
  const probe = { x: 0, y: 0 };
  let maxHeight = 0;

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
    if (xVelocity === 0 && probe.x < target.xMin) {
      return -1; // probe stopped moving forward
    }
  }
  return -1; // probe overshot target
};
