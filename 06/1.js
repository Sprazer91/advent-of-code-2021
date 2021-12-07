const input = document.querySelector("pre").innerHTML.split(",").map(Number);
let DAYS = 256;
let fishes = new Array(9).fill(0);
input.forEach(function (x) { fishes[x] = (fishes[x] || 0) + 1; });

for (let day = 0; day < DAYS; day++) {
    let newDailyFishes = 0
    for (let days = 0; days < fishes.length; days++) {
        if (days===0) {
            newDailyFishes = fishes[days];
        }
        if (days === fishes.length - 1) {
            fishes[days] = 0;
        } else {   
            fishes[days] = fishes[(days+1)];
        }
    }
    fishes[8] = newDailyFishes
    fishes[6] += newDailyFishes
}
console.log(fishes.reduce((a, b) => a + b, 0));