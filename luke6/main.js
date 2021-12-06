var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("pakker.txt"),
});

const blankRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
let packagesFellOff = 0;

lineReader.on("line", (line) => {
  const marks = line.split(",");
  const from = parseInt(marks[0]);
  const markLength = parseInt(marks[1]);
  const to = from + markLength;

  if (canInsertOnTop(from, markLength)) {
    inserOnTop(from, to);
    return;
  }

  const heigthIndex = getInsertHeightIndex(from, markLength);
  if (heigthIndex !== -1) {
    setBoard(heigthIndex, from, to);
    return;
  }

  packagesFellOff++;
});

const canInsertOnTop = (from, markLength) => {
  if (markLength === 1 && board[0][from] == 1) {
    return true;
  }

  return canPutOnTopOfRow(0, from, markLength);
};

const inserOnTop = (from, to) => {
  board.unshift([...blankRow]);
  setBoard(0, from, to);
};

const isMarksEmpty = (heightIndex, from, markLength) => {
  for (let i = from; i < from + markLength; i++) {
    if (board[heightIndex][i] === 1) {
      return false;
    }
  }
  return true;
};

const canPutOnTopOfRow = (heightIndex, from, markLength) => {
  let boxOnLeft = false;
  let boxOnRight = false;
  let half = from + markLength / 2 - 0.5;

  for (let i = from; i < from + markLength; i++) {
    if (board[heightIndex][i] == 1 && i === half) {
      boxOnLeft = true;
      boxOnRight = true;
    } else if (board[heightIndex][i] == 1 && i < half) {
      boxOnLeft = true;
    } else if (board[heightIndex][i] == 1 && i > half) {
      boxOnRight = true;
    }
  }
  return boxOnLeft && boxOnRight;
};

const getInsertHeightIndex = (from, markLength) => {
  if (!isMarksEmpty(0, from, markLength)) {
    return -1;
  }

  let empty = true;
  let y = -1;
  while (empty && y < board.length - 1) {
    y++;
    empty = isMarksEmpty(y, from, markLength);
  }

  if (empty) {
    return y;
  }

  if (canPutOnTopOfRow(y, from, markLength)) {
    return y - 1;
  }
  return -1;
};

const setBoard = (heigthIndex, from, to) => {
  for (let i = from; i < to; i++) {
    board[heigthIndex][i] = 1;
  }
};

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    let lineText = "";
    for (let j = 0; j < board[i].length; j++) {
      lineText += board[i][j];
    }
    console.log(lineText);
  }
  lineText = "";
  for (let i = 0; i < 10; i++) {
    lineText += i;
  }

  lineText += 1;
  for (let i = 1; i < 10; i++) {
    lineText += i;
  }
  console.log(lineText);
};

lineReader.on("close", () => {
  console.log("answer: " + packagesFellOff); // 149
});
