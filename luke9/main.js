const po2019 = 1854803357;
const sb2019 = 2424154637;

const po2020 = 2787141611;
const sb2020 = 2807727397;

const po2021 = 1159251923;
const sb2021 = 2537380333;

const pakkeData = [
  { po: po2019, sb: sb2020 },
  { po: po2020, sb: sb2020 },
  { po: po2021, sb: sb2020 },
];

const highestNumber = Math.pow(10, 13);

const possibleNumbers = [];
const possibleNumbers2 = [];
const possibleNumbers3 = [];

for (let i = 1; i <= 2000; i++) {
  const number = i * sb2019 + po2019;
  if (number <= highestNumber) {
    possibleNumbers.push(number);
  }
}

for (let i = 1; i <= 2000; i++) {
  const number = i * sb2020 + po2020;
  if (number <= highestNumber) {
    possibleNumbers2.push(number);
  }
}

for (let i = 1; i <= 2000; i++) {
  const number = i * sb2021 + po2021;
  if (number <= highestNumber) {
    possibleNumbers3.push(number);
  }
}

let placeholder = [];
possibleNumbers.forEach((p1) => {
  if (possibleNumbers2.indexOf(p1) > -1) {
    placeholder.push(p1);
  }
});

console.log(placeholder);
