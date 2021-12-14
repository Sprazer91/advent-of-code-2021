const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
input.pop();
let allCoordinates = [];
let folds = [];
input.forEach(line => {
    if (line.includes(',')) {
        let coordinate = line.split(',').map(Number);    
        allCoordinates.push({x: coordinate[0], y: coordinate[1]});
    } else {
        if (line.includes('fold along x')) {
            let fold = line.split('fold along x=').map(Number);
            folds.push({x: fold[1]});
        }
        if (line.includes('fold along y')) {
            let fold = line.split('fold along y=').map(Number);
            folds.push({y: fold[1]});
        }
    }
});

folds.forEach(f => {
    if (f.x) {
        foldX(f.x)
    }else{
        foldY(f.y)
    }
})

function foldX(x) {
    allCoordinates = allCoordinates.map(c => {
        if (c.x > x) {
            let diffx = c.x - x;
            c.x -= (diffx*2); 
        }
        return c
    })
}

function foldY(y) {
    allCoordinates = allCoordinates.map(c => {
        if (c.y > y) {
            let diffy = c.y - y;
            c.y -= (diffy*2); 
        }
        return c
    })
}

/* Remove all duplicate coordinates */
const dedup = [...allCoordinates.reduce((map, { x, y }) => {
    return (map.set(`${x}-${y}`, { x, y }));
}, new Map()).values()];
 
const maxX = Math.max.apply(Math, dedup.map(function(o) { return o.x; }));
const maxY = Math.max.apply(Math, dedup.map(function(o) { return o.y; }));

for (let i = 0; i <= maxY; i++) {
    let row = ""
    for (let j = 0; j <= maxX; j++) {
        let found = "  "
        dedup.forEach(d => {
            if (d.x === j && d.y === i) {
                found = "##"
            }
        })
        row +=found
    }
    console.log(row);
}
