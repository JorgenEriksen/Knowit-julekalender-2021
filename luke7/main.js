let strikk = 20;
let maur = 1;

while (strikk > maur) {
  nyStrik = strikk + 20;
  weight = nyStrik / strikk;

  maur = maur * weight;
  strikk = nyStrik;
  maur += 1;
}

console.log(maur + "cm, " + strikk + "cm");
