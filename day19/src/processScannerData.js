function processScannerData(scannerData, findMaxManhattanDist = false) {

  // for each scanner calculate the distances between all beacons
  const scannerPositions = [];
  for (const scanner of scannerData) {
    scannerPositions.push({ id: scanner.number, x: 0, y: 0, z: 0 });
    for (const beacon of scanner.beacons) {
      beacon["distances"] = distanceToOtherBeacons(scanner, beacon);
    }
  }

  // look for two scanners with 12 matching beacon distances
  const scannerMatches = [];
  for (const firstScanner of scannerData) {
    for (const secondScanner of scannerData) {
      if (firstScanner.number === secondScanner.number) continue;
      const sameBeacons = compareDistances(firstScanner, secondScanner);
      sameBeacons.length === 12 &&
        scannerMatches.push({
          first: firstScanner.number,
          second: secondScanner.number,
          beacons: sameBeacons,
        });
    }
  }

  // set rotation of initial scanner to first orientation
  scannerPositions[0]["rotate"] = orientations[0];
  let changed = true;
  while (changed) {
    changed = false;
    for (const match of scannerMatches) {
      const firstPosition = scannerPositions.find((p) => p.id === match.first);
      const second = scannerPositions.findIndex((p) => p.id === match.second);
      if (!firstPosition.rotate || scannerPositions[second].rotate) continue;
      // determine rotation and position offset for second scanner
      for (const rotation of orientations) {
        const offset = compareBeacons(match, firstPosition, rotation);
        if (offset) {
          scannerPositions[second].x = firstPosition.x + offset.x;
          scannerPositions[second].y = firstPosition.y + offset.y;
          scannerPositions[second].z = firstPosition.z + offset.z;
          scannerPositions[second]["rotate"] = rotation;
          changed = true;
          break;
        }
      }
    }
  }

  if (findMaxManhattanDist) {
    // Part 2 largest Manhattan distance between any two scanners
    let manhattanMax = 0;
    for (const firstPosition of scannerPositions) {
      for (const secondPosition of scannerPositions) {
        const manhattanDistance =
          Math.abs(firstPosition.x - secondPosition.x) +
          Math.abs(firstPosition.y - secondPosition.y) +
          Math.abs(firstPosition.z - secondPosition.z);
        manhattanMax = Math.max(manhattanMax, manhattanDistance);
      }
    }
    return manhattanMax;
  }

  // Part 1 total number of unique beacons in the full map
  let uniqueBeacons = new Set();
  for (const scanner of scannerData) {
    for (const beacon of scanner.beacons) {
      const scannerPos = scannerPositions.find(
        (row) => row.id === scanner.number
      );
      const rotatedBeacon = rotateBeacon(scannerPos.rotate, beacon);
      rotatedBeacon.x += scannerPos.x;
      rotatedBeacon.y += scannerPos.y;
      rotatedBeacon.z += scannerPos.z;
      uniqueBeacons.add(
        `${rotatedBeacon.x},${rotatedBeacon.y},${rotatedBeacon.z}`
      );
    }
  }
  return uniqueBeacons.size;
}
exports.processScannerData = processScannerData;

function compareBeacons(scannerMatch, firstPos, rotation) {
  // orientation is correct if all beacon pairs have same offset
  let beaconOffset = undefined;
  for (const [firstBeacon, secondBeacon] of scannerMatch.beacons) {
    const firstRotated = rotateBeacon(firstPos.rotate, firstBeacon);
    const secondRotated = rotateBeacon(rotation, secondBeacon);
    firstRotated.x -= secondRotated.x;
    firstRotated.y -= secondRotated.y;
    firstRotated.z -= secondRotated.z;
    if (!beaconOffset) {
      beaconOffset = {
        x: firstRotated.x,
        y: firstRotated.y,
        z: firstRotated.z,
      };
    } else if (
      beaconOffset.x !== firstRotated.x ||
      beaconOffset.y !== firstRotated.y ||
      beaconOffset.z !== firstRotated.z
    ) {
      beaconOffset = undefined;
      break;
    }
  }
  return beaconOffset;
}

function rotateBeacon(scannerRotation, beacon) {
  const rotatedBeacon = { x: 0, y: 0, z: 0 };
  for (const [index, axis] of scannerRotation.entries()) {
    // first char of axis is "+/-" direction, second char is "x/y/z"
    const newValue = axis[0] === "+" ? beacon[axis[1]] : 0 - beacon[axis[1]];
    // first index is facing, second is up, third is out
    if (index === 0) rotatedBeacon.x = newValue;
    else if (index === 1) rotatedBeacon.y = newValue;
    else if (index === 2) rotatedBeacon.z = newValue;
  }
  return rotatedBeacon;
}

function compareDistances(firstScanner, secondScanner) {
  const sameBeacons = [];
  for (const beacon of firstScanner.beacons) {
    for (const other of secondScanner.beacons) {
      let matchCount = 0;
      for (const distBeacon of beacon.distances) {
        for (const distOther of other.distances) {
          if (distBeacon === distOther) matchCount++;
        }
      }
      matchCount === 12 && sameBeacons.push([beacon, other]);
    }
  }
  return sameBeacons;
}

function distanceToOtherBeacons(scanner, beacon) {
  const distanceToBeacons = [];
  for (const otherBeacon of scanner.beacons) {
    distanceToBeacons.push(
      Math.sqrt(
        Math.abs(beacon.x - otherBeacon.x) ** 2 +
          Math.abs(beacon.y - otherBeacon.y) ** 2 +
          Math.abs(beacon.z - otherBeacon.z) ** 2
      )
    );
  }
  return distanceToBeacons;
}

const orientations = [
  ["+x", "+y", "+z"], // facing +x, up +y, out +z
  ["+x", "-y", "-z"], // facing +x, up -y, out -z
  ["+x", "+z", "-y"], // facing +x, up +z, out -y
  ["+x", "-z", "+y"], // facing +x, up -z, out +y

  ["-x", "+y", "-z"], // facing -x, up +y, out -z
  ["-x", "-y", "+z"], // facing -x, up -y, out +z
  ["-x", "+z", "+y"], // facing -x, up +z, out +y
  ["-x", "-z", "-y"], // facing -x, up -z, out -y

  ["+y", "+x", "-z"], // facing +y, up +x, out -z
  ["+y", "-x", "+z"], // facing +y, up -x, out +z
  ["+y", "+z", "+x"], // facing +y, up +z, out +x
  ["+y", "-z", "-x"], // facing +y, up -z, out -x

  ["-y", "+x", "+z"], // facing -y, up +x, out +z
  ["-y", "-x", "-z"], // facing -y, up -x, out -z
  ["-y", "+z", "-x"], // facing -y, up +z, out -x
  ["-y", "-z", "+x"], // facing -y, up -z, out +x

  ["+z", "+x", "+y"], // facing +z, up +x, out +y
  ["+z", "-x", "-y"], // facing +z, up -x, out -y
  ["+z", "+y", "-x"], // facing +z, up +y, out -x
  ["+z", "-y", "+x"], // facing +z, up -y, out +x

  ["-z", "+x", "-y"], // facing -z, up +x, out -y
  ["-z", "-x", "+y"], // facing -z, up -x, out +y
  ["-z", "+y", "+x"], // facing -z, up +y, out +x
  ["-z", "-y", "-x"], // facing -z, up -y, out -x
];
