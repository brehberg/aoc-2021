function processLineSegments(lineSegments, includeDiagonals = false) {
  const lines = parseInputData(lineSegments, includeDiagonals);
  const ventMap = initializeVentMap(lines.xMax, lines.yMax);
  markOriginalLinesOnMap(lines.original);
  markDiagonalLinesOnMap(lines.diagonal);
  return hydrothermalDangerLevel(2);

  function parseInputData(lineSegments, includeDiagonals) {
    const lines = { xMax: 0, yMax: 0, original: [], diagonal: [] };

    lineSegments.forEach(({ start, end }) => {
      lines.xMax = Math.max(lines.xMax, start.x, end.x);
      lines.yMax = Math.max(lines.yMax, start.y, end.y);

      // reverse any lines that are listed backwards
      if (start.x === end.x || start.y === end.y) {
        start.x > end.x || start.y > end.y
          ? lines.original.push({ start: end, end: start })
          : lines.original.push({ start: start, end: end });
      } else if (includeDiagonals) {
        start.x > end.x
          ? lines.diagonal.push({ start: end, end: start })
          : lines.diagonal.push({ start: start, end: end });
      }
    });
    return lines;
  }

  function initializeVentMap(x, y) {
    return Array(x + 1)
      .fill()
      .map(() => Array(y + 1).fill(0));
  }

  function markOriginalLinesOnMap(lines) {
    lines.forEach(({ start, end }) => {
      for (let y = start.y; y <= end.y; y++) {
        for (let x = start.x; x <= end.x; x++) {
          ventMap[y][x] += 1;
        }
      }
    });
  }

  function markDiagonalLinesOnMap(diagonals) {
    diagonals.forEach(({ start, end }) => {
      const slope = start.y < end.y ? 1 : -1;
      let y = start.y;
      for (let x = start.x; x <= end.x; x++) {
        ventMap[y][x] += 1;
        y += slope;
      }
    });
  }

  function hydrothermalDangerLevel(min) {
    return ventMap.flat().filter((value) => value >= min).length;
  }
}
exports.processLineSegments = processLineSegments;
