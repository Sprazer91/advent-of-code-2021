const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
input.pop();
// const input = `1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581`.split(/\r?\n/);
input.forEach((line, id) => {
    input[id] = line.split('').map(Number);
});
let maxX = input[0].length;
let maxY = input.length;
console.log([maxX, maxY])

let shortestPath = maxX + maxY * 9 - 18;
let shortestPathArray = []
for (let index = 0; index < 100000000; index++) {
    let prevX = 0;
    let prevY = 0;
    let currX = 0;
    let currY = 0;
    let notAtEnd = true;
    let currentPath = 0;
    let walkedEnough = false;
    let currentPathArray = []
    while (notAtEnd && !walkedEnough) {
        [prevX, prevY, currX, currY] = drunkWalk(prevX, prevY, currX, currY, index > 1000000, index > 10000000 ? 9 : 5)
        currentPathArray.push(currY+","+currX)
        currentPath += input[currY][currX]
        walkedEnough = currentPath > shortestPath
        if (currY == maxY - 1 && currX == maxX - 1){
            notAtEnd = false;
            console.log("AT END", currentPath)
            shortestPath = currentPath;
            shortestPathArray = currentPathArray;
            // console.log([prevX, prevY, currX, currY], currentPath)
        }
    }
}
console.log(shortestPathArray, "shortestPathArray");

function drunkWalk(prevX, prevY, currX, currY, guided, strict) {
    let newX = currX;
    let newY = currY;
    let bounds = true;
    do {

        let followGuide = guided ? Math.floor(Math.random() * (10 - 1 + 1) + 1) <= strict : false
        let dirr = Math.floor(Math.random() * (12 - 1 + 1) + 1)
        // if(guided && !followGuide){
        //     console.log("notFollowing")
        // }
        newX = currX;
        newY = currY;
        switch(dirr) {
            case 1:
                newX += 1;
                break;
            case 2:
                newX += 1;
                break;
            case 3:
                newY -= 1;
                break;
            case 4:
                newY -= 1;
                break;
            case 5:
                newX += 1;
                break;
            case 6:
                newX += 1;
                break;
            case 7:
                newY -= 1;
                break;
            case 8:
                newY += 1;
                break;
            case 9:
                newX += 1;
                break;
            case 10:
                newX -= 1;
                break;
            case 11:
                newY -= 1;
                break;
            case 12:
                newY += 1;
                break;
        }
        if (followGuide) {
            // console.log("follow guide!")
            let id = shortestPathArray.indexOf(currY+","+currX)
            if (id !== -1) {
                let guide = shortestPathArray[id+1].split(',').map(Number)
                // console.log(guide)
                newY = guide[0]
                newX = guide[1]
            }
            // console.log("shortestPathArray.indexOf(currY+","+currX)", shortestPathArray.indexOf(currY+","+currX))
        }
        bounds = newY >= 0 && newY < maxY && newX >= 0 && newX < maxX
    } while ((newY === prevY && newX === prevX) || !bounds);
    return [currX, currY, newX, newY];
}