const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
input.pop();
const lines = input.map(e => e.split("").map(Number));
let basins = [];
let allBasinPoints = [];
let currentBasingPoints = [];
let currentBasingValues = [];
lines.forEach((numbers, nID) => {
    numbers.forEach((number, id) => {
        if (checkPoint(id, nID)) {
            while (currentBasingPoints.length > 0) {
                let basinPoint = currentBasingPoints.shift();
                checkPoint(basinPoint[0], (basinPoint[1] + 1));
                checkPoint(basinPoint[0], (basinPoint[1] - 1));
                checkPoint(basinPoint[0] - 1, (basinPoint[1]));
                checkPoint((basinPoint[0] + 1), basinPoint[1]);
            }
            basins.push(currentBasingValues.length);
            currentBasingValues = [];
        }
    });
});

basins = basins.sort((a, b) => a - b).reverse();
console.log(basins[0] * basins[1] * basins[2], "result")

function getDefined(array, x, y){
    if (typeof array[y] === 'undefined') {
        return 1000; 
    }
    if (typeof x !== 'undefined' && typeof array[y][x] === 'undefined') {
        return 1000; 
    }
    return array[y][x];
}

function checkPoint(x, y) {
    let number = getDefined(lines, x, y)
    if ( number < 9 && !allBasinPoints.includes(x+","+y)) {
        currentBasingValues.push(number);
        currentBasingPoints.push([x, y])
        allBasinPoints.push(x+","+y)
        return true;
    }
    return false;
}