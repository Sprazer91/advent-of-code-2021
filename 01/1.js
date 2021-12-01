/* I Ran this in the console at https://adventofcode.com/2021/day/1/input */
const numbers = document.querySelector("pre").innerHTML.split(/\r?\n/).reverse();
let larger = 0;
numbers.forEach((number, index) => {
    if (index+1 < numbers.length) {
        if (parseInt(number) > numbers[index+1]) {
            larger++;
        }
    }
});
console.log(larger);