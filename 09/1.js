const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
input.pop();
const lines = input.map(e => e.split("").map(Number));
let found = []
lines.forEach((numbers, nID) => {
    numbers.forEach((number, id) => {
        let upper = number < getDefined(lines, nID - 1, id);
        let left  = number < getDefined(numbers, id - 1);
        let right = number < getDefined(numbers, id + 1);
        let lower = number < getDefined(lines, nID + 1, id);
        if (upper && left && right && lower) {
            found.push((number + 1 ));
        }
    });
});
console.log(found);
console.log(found.reduce((a, b) => a + b, 0));

function getDefined(array, key, subKey){
    if (typeof array[key] === 'undefined') {
        return 1000; 
    }
    if (typeof subKey !== 'undefined' && typeof array[key][subKey] === 'undefined') {
        return 1000; 
    }
    return typeof subKey !== 'undefined' ? array[key][subKey] : array[key];
}