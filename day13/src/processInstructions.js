function processInstructions(input, finishFolding = false) {
  // fold up for horizontal (y lines) or left for vertical (x lines)
  for (const fold of input.foldDirections) {
    for (const dot of input.randomDots) {
      if (fold.axis === "x" && dot.x > fold.line)
        dot.x -= (dot.x - fold.line) * 2;
      else if (fold.axis === "y" && dot.y > fold.line)
        dot.y -= (dot.y - fold.line) * 2;
    }
    if (!finishFolding) break;
  }
  // collect the unique visible dots and determine final paper size
  const final = { dots: [], max: { x: 0, y: 0 } };
  for (const dot of input.randomDots) {
    if (final.dots.some((d) => d.x === dot.x && d.y === dot.y)) continue;
    final.dots.push(dot);
    final.max.x = Math.max(final.max.x, dot.x);
    final.max.y = Math.max(final.max.y, dot.y);
  }
  // convert remaining dots into text string that displays the code
  let text = "";
  if (finishFolding) {
    const output = Array(final.max.y + 1)
      .fill()
      .map((_) => Array(final.max.x + 1).fill(" "));
    for (const dot of final.dots) {
      output[dot.y][dot.x] = "#";
    }
    const newline = "\n    ";
    text = output.reduce((str, row) => str + newline + row.join(""), "");
  }
  return final.dots.length + text;
}
exports.processInstructions = processInstructions;
