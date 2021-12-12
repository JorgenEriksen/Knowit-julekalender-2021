var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

let byer = [];
let path = [];
let map = [];

lineReader.on("line", (line) => {
  if (line[0] === "(") {
    let val = line.replace("(", "");
    val = val.replace(")", "");
    val = val.split(",");
    byer.push({ x: parseInt(val[0]), y: parseInt(val[1]) });
  } else {
    path.push(line);
  }
});

lineReader.on("close", () => {
  createMap(1000, 1000);
  let startPos = byer[path[0]];
  for (let i = 0; i < path.length; i++) {
    endPos = byer[path[i]];
    givePackages(startPos, endPos);
    startPos = endPos;
  }

  [a, b] = findHighestRectangle();
  console.log("answer: ");
  console.log(a);
  console.log(b);
});

const findHighestRectangle = () => {
  let highestNumber = 0;
  let startPos = { x: 0, y: 0 };
  let endPos = { x: 0, y: 0 };

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === highestNumber) {
        endPos.x = x;
        endPos.y = y;
      }
      if (map[y][x] > highestNumber) {
        startPos.x = x;
        startPos.y = y;
        highestNumber = map[y][x];
      }
    }
  }
  return [startPos, endPos];
};

const givePackages = (startPos, endPos) => {
  let yChange = startPos.y < endPos.y ? 1 : -1;
  let xChange = startPos.x < endPos.x ? 1 : -1;

  for (let y = startPos.y; y !== endPos.y; y += yChange) {
    for (let x = startPos.x; x !== endPos.x; x += xChange) {
      map[y][x] += 1;
    }
  }
};

const createMap = (width, height) => {
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      map[y].push(0);
    }
  }
};
