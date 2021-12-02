const fs = require("fs");
const readline = require("readline");

var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("tall.txt"),
});

let ensifret = [
  { text: "en", val: 1 },
  { text: "to", val: 2 },
  { text: "tre", val: 3 },
  { text: "fire", val: 4 },
  { text: "fem", val: 5 },
  { text: "seks", val: 6 },
  { text: "sju", val: 7 },
  { text: "åtte", val: 8 },
  { text: "ni", val: 9 },
];

let tosifret = [
  { text: "tjue", val: 20 },
  { text: "tretti", val: 30 },
  { text: "førti", val: 40 },
  { text: "femti", val: 50 },
];

let ten = [
  { text: "ti", val: 10 },
  { text: "elleve", val: 11 },
  { text: "tolv", val: 12 },
  { text: "tretten", val: 13 },
  { text: "fjorten", val: 14 },
  { text: "femten", val: 15 },
  { text: "seksten", val: 16 },
  { text: "sytten", val: 17 },
  { text: "atten", val: 18 },
  { text: "nitten", val: 19 },
];

let sum = 0;

lineReader.on("line", (line) => {
  let hit = true;
  let charIndex = 0;

  // sjekker ten
  while (hit) {
    hit = false;
    // sjekker ten
    ten.forEach((num) => {
      if (line.substr(charIndex, num.text.length) === num.text && !hit) {
        sum += num.val;
        charIndex += num.text.length;
        hit = true;
        return;
      }
    });

    //sjekker tosifret
    if (!hit) {
      tosifret.forEach((tosifretNum) => {
        if (
          line.substr(charIndex, tosifretNum.text.length) ===
            tosifretNum.text &&
          !hit
        ) {
          sum += tosifretNum.val;
          charIndex += tosifretNum.text.length;
          hit = true;
          return;
        }
      });
    }

    // sjekker ensifret
    if (!hit) {
      ensifret.forEach((ensifretNum) => {
        if (
          line.substr(charIndex, ensifretNum.text.length) ===
            ensifretNum.text &&
          !hit
        ) {
          sum += ensifretNum.val;
          charIndex += ensifretNum.text.length;
          hit = true;
        }
      });
    }
  }
});

lineReader.on("close", () => {
  console.log("answer: " + sum);
});
