let totalNumberOfPossibilites = 0;

const blankNodeList = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

const numberOfVisited = (currentNodeList) => {
  let visited = 0;
  currentNodeList.forEach((n) => {
    visited += n > -1 ? 1 : 0;
  });
  return visited;
};

const rotateBoard = (currentNodeList, fromIndex, toIndex) => {
  let thisNodeList = [...currentNodeList];
  let toIndexBoard = [...blankNodeList];
  toIndexBoard[toIndex] = 9;
  if (fromIndex === 3 || fromIndex === 6) {
    thisNodeList = rotateRight([...currentNodeList]);
    toIndexBoard = rotateRight([...toIndexBoard]);
  }
  if (fromIndex === 5 || fromIndex === 2) {
    thisNodeList = rotateLeft([...currentNodeList]);
    toIndexBoard = rotateLeft([...toIndexBoard]);
  }
  if (fromIndex === 7 || fromIndex === 8) {
    placeholder = rotateLeft([...currentNodeList]);
    thisNodeList = rotateLeft([...placeholder]);

    placeholder = rotateLeft([...toIndexBoard]);
    toIndexBoard = rotateLeft([...placeholder]);
  }

  return [thisNodeList, toIndexBoard.indexOf(9)];
};

const canVisit = (currentNodeList, fromIndex, toIndex) => {
  if (toIndex === 4 || fromIndex === 4) {
    return true;
  }
  let fromCorner = false;

  if (
    fromIndex === 0 ||
    fromIndex === 2 ||
    fromIndex === 6 ||
    fromIndex === 8
  ) {
    fromCorner = true;
  }

  let [newNodeList, newToIndex] = rotateBoard(
    [...currentNodeList],
    fromIndex,
    toIndex
  );
  if (fromCorner) {
    if (newToIndex === 2 && newNodeList[1] === -1) {
      return false;
    }
    if (newToIndex === 8 && newNodeList[4] === -1) {
      return false;
    }
    if (newToIndex === 6 && newNodeList[3] === -1) {
      return false;
    }
  } else {
    if (newToIndex === 7 && newNodeList[4] === -1) {
      return false;
    }
  }

  return true;
};

const rotateLeft = (currentNodeList) => [
  currentNodeList[2],
  currentNodeList[5],
  currentNodeList[8],
  currentNodeList[1],
  currentNodeList[4],
  currentNodeList[7],
  currentNodeList[0],
  currentNodeList[3],
  currentNodeList[6],
];

const rotateRight = (currentNodeList) => [
  currentNodeList[6],
  currentNodeList[3],
  currentNodeList[0],
  currentNodeList[7],
  currentNodeList[4],
  currentNodeList[1],
  currentNodeList[8],
  currentNodeList[5],
  currentNodeList[2],
];

const printNodes = (nodes) => {
  console.log(
    `${nodes[0] === -1 ? "" : " "}${nodes[0]}${nodes[1] === -1 ? "" : " "}${
      nodes[1]
    }${nodes[2] === -1 ? "" : " "}${nodes[2]}`
  );

  console.log(
    `${nodes[3] === -1 ? "" : " "}${nodes[3]}${nodes[4] === -1 ? "" : " "}${
      nodes[4]
    }${nodes[5] === -1 ? "" : " "}${nodes[5]}`
  );

  console.log(
    `${nodes[6] === -1 ? "" : " "}${nodes[6]}${nodes[7] === -1 ? "" : " "}${
      nodes[7]
    }${nodes[8] === -1 ? "" : " "}${nodes[8]}`
  );
  console.log("");
};

const visitNode = (currentNodeList, index, number) => {
  let thisNode = [...currentNodeList];
  thisNode[index] = number;

  if (numberOfVisited([...thisNode]) >= 8) {
    totalNumberOfPossibilites++;
    return;
  }
  for (let i = 0; i < 9; i++) {
    if (thisNode[i] === -1 && canVisit([...thisNode], index, i)) {
      visitNode([...thisNode], i, number + 1);
    }
  }
};

let nodeList = [...blankNodeList];

visitNode([...nodeList], 3, 0);
console.log(totalNumberOfPossibilites);
