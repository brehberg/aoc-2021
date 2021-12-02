function processCommands(commands, type = "basic") {
  let [position, depth, aim] = [0, 0, 0];
  commands.forEach((command) => {
    const [option, value] = [command[0], parseInt(command[1])];
    type === "basic"
      ? handleBasic(option, value)
      : handleAdvanced(option, value);
  });
  return position * depth;

  function handleBasic(option, value) {
    if (option === "forward") {
      position += value;
    } else if (option === "down") {
      depth += value;
    } else if (option === "up") {
      depth -= value;
    }
  }

  function handleAdvanced(option, value) {
    if (option === "forward") {
      position += value;
      depth += aim * value;
    } else if (option === "down") {
      aim += value;
    } else if (option === "up") {
      aim -= value;
    }
  }
}
exports.processCommands = processCommands;
