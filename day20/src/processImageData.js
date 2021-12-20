function processImageData(imageData, enhancementSteps = 1) {
  let newImage = imageData.input;
  let imageHeight = newImage.length;
  let imageWidth = newImage[0].length;
  const enhanceSize = 2;
  // algorithm that starts with dark pixel (.) will not alternate
  const stableImage = imageData.algorithm[0] === ".";

  for (let step = 0; step < enhancementSteps; step++) {
    const oldImage = newImage;
    // expand image by ehancement size on top, bottom, left, and right
    imageHeight += enhanceSize * 2;
    imageWidth += enhanceSize * 2;
    newImage = Array(imageHeight)
      .fill()
      .map((_) => Array(imageWidth).fill(""));

    for (let row = 0; row < imageHeight; row++) {
      for (let col = 0; col < imageWidth; col++) {
        // use binary number as index in the enhancement algorithm string
        const infiniteDigit = stableImage ? "0" : step % 2 === 0 ? "0" : "1";
        const binary = determinePixelCode(row, col, oldImage, infiniteDigit);
        newImage[row][col] = imageData.algorithm[parseInt(binary, 2)];
      }
    }
  }
  // How many light pixels (#) are in the resulting image
  return newImage.flat().reduce((count, pixel) => count + (pixel === "#"), 0);

  function determinePixelCode(row, col, oldImage, infiniteDigit) {
    const maxRow = oldImage.length - 1;
    const maxCol = oldImage[0].length - 1;
    // binary number based on 3x3 square of pixels (infinite size)
    let binaryString = "";
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const oldRow = row + rowOffset - enhanceSize;
        const oldCol = col + colOffset - enhanceSize;
        binaryString +=
          oldRow < 0 || oldCol < 0 || oldRow > maxRow || oldCol > maxCol
            ? infiniteDigit
            : oldImage[oldRow][oldCol] === "."
            ? "0"
            : "1";
      }
    }
    return binaryString;
  }
}
exports.processImageData = processImageData;
