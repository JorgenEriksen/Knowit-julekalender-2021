const fs = require("fs");
const readline = require("readline");

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let data = [];
let highestSoFar = [0, 0];

lineReader.on("line", (line) => {
  for (var i = 0; i < line.length; i++) {
    let value = line[i] === "J" ? 1 : -1;
    data.push(0);
    updateAndCheckNewData(value);
  }
  console.log("answer: " + highestSoFar[0] + ", " + highestSoFar[1]);
});

const updateAndCheckNewData = (value) => {
  for (var i = 0; i < data.length; i++) {
    data[i] += value;
    if (data[i] === 0 && data.length - i > highestSoFar[0]) {
      highestSoFar = [data.length - i, i];
    }
  }
};
