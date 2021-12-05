function processLineSegments(lineSegments, includeDiagonals = false) {
  const lineData = parseInputData(lineSegments, includeDiagonals);
  const ventMap = initializeVentMap(lineData.xMax, lineData.yMax);
  ventMap.markOriginalLines(lineData.original);
  ventMap.markDiagonalLines(lineData.diagonal);
  return ventMap.hydrothermalDangerLevel(2);
}
exports.processLineSegments = processLineSegments;

function parseInputData(lineSegments, includeDiagonals) {
  const lines = { xMax: 0, yMax: 0, original: [], diagonal: [] };

  lineSegments.forEach(({ start, end }) => {
    lines.xMax = Math.max(lines.xMax, start.x, end.x);
    lines.yMax = Math.max(lines.yMax, start.y, end.y);

    // reverse any lines that are listed backwards
    if (start.x === end.x || start.y === end.y) {
      lines.original.push(
        start.x > end.x || start.y > end.y
          ? { start: end, end: start }
          : { start: start, end: end }
      );
    } else if (includeDiagonals) {
      lines.diagonal.push(
        start.x > end.x
          ? { start: end, end: start }
          : { start: start, end: end }
      );
    }
  });
  return lines;
}

function initializeVentMap(x, y) {
  return {
    data: Array(x + 1)
      .fill()
      .map(() => Array(y + 1).fill(0)),

    markOriginalLines: function (lines) {
      lines.forEach(({ start, end }) => {
        for (let y = start.y; y <= end.y; y++) {
          for (let x = start.x; x <= end.x; x++) {
            this.data[y][x]++;
          }
        }
      });
    },

    markDiagonalLines: function (diagonals) {
      diagonals.forEach(({ start, end }) => {
        const slope = start.y < end.y ? 1 : -1;
        let y = start.y;
        for (let x = start.x; x <= end.x; x++) {
          this.data[y][x]++;
          y += slope;
        }
      });
    },

    hydrothermalDangerLevel: function (min) {
      return this.data.flat().filter((val) => val >= min).length;
    },
  };
}
