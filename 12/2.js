const data = `KF-sr
OO-vy
start-FP
FP-end
vy-mi
vy-KF
vy-na
start-sr
FP-lh
sr-FP
na-FP
end-KF
na-mi
lh-KF
end-lh
na-start
wp-KF
mi-KF
vy-sr
vy-lh
sr-mi`.split(/\r?\n/);
let connections = [];
let printed = []
data.forEach(d => {
    let caves = d.split('-');
    if(caves[1] !== "start" && caves[0] !== "end") {
        connections[caves[0]] = connections[caves[0]] ? connections[caves[0]] : [];
        connections[caves[0]].push(caves[1]);
    }
    if(caves[0] !== "start" && caves[1] !== "end") {
        connections[caves[1]] = connections[caves[1]] ? connections[caves[1]] : [];
        connections[caves[1]].push(caves[0]);
    }
})

let paths = []
let currentPath = 0;
connections["start"].forEach(cave => {
    printCaveConnections(cave, "start", false);
    printed = [];
})

function printCaveConnections(cave, current, moreThanOneSmall) {
    if (!(cave.toLowerCase() === cave && current.includes(cave) && moreThanOneSmall)) {
        let oneSmall = moreThanOneSmall ? moreThanOneSmall : (cave.toLowerCase() === cave && current.includes(cave))
        current += "," +cave ;
        if (cave === "end") {
            paths[currentPath] = current;
            currentPath++;
        } else {
            connections[cave].forEach(c => {
                printCaveConnections(c, current, oneSmall)
            })
        }
    }
}
console.log(paths);
console.log(connections);