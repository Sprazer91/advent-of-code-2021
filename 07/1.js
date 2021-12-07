const input = document.querySelector("pre").innerHTML.split(",").map(Number);
let sorted = input.sort((a, b) => a - b);
let fuel = []
const maxVal = sorted[sorted.length - 1];
for(let i = 0 ; i < maxVal; i++){
    fuel[i] = 0
    input.forEach((pos) => {
        fuel[i] += Math.abs(pos - i);
    });
}
const sortFuel = fuel.sort((a, b) => a - b);
console.log(sortFuel[0])