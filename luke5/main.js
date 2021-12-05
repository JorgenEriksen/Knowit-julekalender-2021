var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("tree.txt"),
});

let highest = 0;
let currentNumber = -1;

lineReader.on("line", (line) => {
  for (let i = 0; i < line.length; i++) {
    if (line.substr(i, "Grinch".length) === " Grinch") {
      currentNumber--;
    } else if (line[i] === "(") {
      currentNumber++;
    } else if (line[i] === ")") {
      currentNumber--;
    }
    if (currentNumber > highest) {
      highest = currentNumber;
    }
  }
});

lineReader.on("close", () => {
  console.log("answer: " + highest); // 149
});
