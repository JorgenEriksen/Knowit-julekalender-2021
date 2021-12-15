var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("task.txt"),
});

let index = 0;
let previosLines = [];
let validCategoriesIndex = [];

lineReader.on("line", (line) => {
  let lineDept = 0;
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

  if (type === "G" && lineDept > 0) {
    let curDept = lineDept;
    for (let i = previosLines.length - 1; i >= 0; i--) {
      if (previosLines[i].dept === curDept - 1) {
        curDept = previosLines[i].dept;
        validCategoriesIndex.indexOf(previosLines[i].idx) === -1
          ? validCategoriesIndex.push(previosLines[i].idx)
          : null;
      }
    }
  }

  previosLines.push({ line: line, dept: lineDept, idx: index });
  index++;
});

lineReader.on("close", () => {
  console.log("answer: " + validCategoriesIndex.length);
});
