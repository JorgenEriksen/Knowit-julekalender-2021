var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("task.txt"),
});

let prevDept = 0;
let numberOfLines = 1;
let prevType = "";
let catRemoved = 0;
let giftDept = 0;
let prevGiftDept = 0;
let catRemoveCounter = 0;
let totalCatCounter = 0;

lineReader.on("line", (line) => {
  let lineDept = 0;
  let text = line;

  if (numberOfLines > 100) {
    return;
  }

  let type = "";
  let counter = 0;
  while (type === "") {
    if (line[counter] === "-") {
      lineDept++;
    } else if (line[counter] === "G") {
      type = "G";
    } else if (line[counter] === "K") {
      type = "K";
    }
    counter++;
  }

  if (type == "G" && prevType == "K" && lineDept === prevDept) {
    //catRemoved = catRemoveCounter - (prevDept - lineDept);
    catRemoved += 1;
    catRemoveCounter = 0;
  } else if (type == "G" && prevType == "K" && lineDept < prevDept) {
    catRemoved += catRemoveCounter;
  } else if (type == "G") {
    catRemoveCounter = 0;
  } else if (type == "K" && lineDept <= prevDept && prevType == "K") {
    catRemoved += catRemoveCounter;
    catRemoveCounter = 0;
  }

  if (type == "K") {
    catRemoveCounter++;
    totalCatCounter++;
  }

  prevDept = lineDept;
  prevType = type;
  numberOfLines++;
  text += " (" + catRemoved + ")";
  console.log(text);
});

lineReader.on("close", () => {
  console.log("categories removed: " + catRemoved);
  console.log("total categories: " + totalCatCounter);
  console.log("answer: " + (totalCatCounter - catRemoved));
});
