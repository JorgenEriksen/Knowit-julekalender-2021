let totalSteps = 100000000000000000079;
let powerOfTen = Math.pow(10, Math.floor(Math.log10(totalSteps)));
let rest = powerOfTen % totalSteps;
let answerLength = totalSteps.toString().length - 1;

let targetX = false;
let addX = 0;
let addY = 0;
for (let i = 0; i < 10079; i++) {
  // 10000 + rest (but js is bad with big numbers)
  if (targetX) {
    addX++;
    if (addX % 3 !== 0 && addX % 5 === 0) {
      targetX = false;
    }
  } else {
    addY += 1;
    if (addY % 3 === 0 && addY % 5 !== 0) {
      targetX = true;
    }
  }
}

let addLength = addX.toString().length;

let answerX = [];
let answerY = [];
for (let i = 0; i < answerLength - addLength; i++) {
  answerX.push("6");
  answerY.push("3");
}

for (let i = 0; i < addLength; i++) {
  answerX.push(addX.toString()[i]);
  answerY.push(addY.toString()[i]);
}

console.log("answer: ");
console.log(answerX.join("") + "," + answerY.join(""));
