const data = `3113284886
2851876144
2774664484
6715112578
7146272153
6256656367
3148666245
3857446528
7322422833
8152175168`.split(/\r?\n/);
let octos = [];
data.forEach(d => {
    octos.push(d.split('').map(Number));
})
let flashes = 0;
let allFlased = false;
let day = 1;
while(!allFlased) {
    octos.forEach((octoline, y) => {
        octoline.forEach((octo, x) => {
            increasePos(y, x)
        })
    });
    
    allFlased = resetFlashedOctos(day);
    day++;
}

function resetFlashedOctos(day) {
    let totalFlashes = 0;
    octos.forEach((octoline, y) => {
        octoline.forEach((octo, x) => {
            if (octo >= 10) {
                octos[y][x] = 0;
                totalFlashes++
            }
        })
    });
    if (totalFlashes === 100) {
        console.log("all flashed on day: ", day);
        return true
    }
    return false
}

function increasePos(y, x) {
    if (x >= 0 && y >= 0 && x <= 9 && y <= 9) {
        octos[y][x] += 1;
        if (octos[y][x] == 10) {
            handleFlash(x, y);
        }
    }
}

function handleFlash(x, y) {
    flashes++;
    /* to the left */
    increasePos( y-1, x-1 );
    increasePos( y, x-1 );
    increasePos( y+1, x-1 );
    /* up */
    increasePos( y-1, x );
    /* down */
    increasePos( y+1, x );
    /* to the right */
    increasePos( y-1, x+1 );
    increasePos( y, x+1 );
    increasePos( y+1, x+1 );
}


console.log(flashes, "flashes")