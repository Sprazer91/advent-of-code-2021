/* I Ran this in the console at https://adventofcode.com/2021/day/3/input */
let binaries = document.querySelector("pre").innerHTML.split(/\r?\n/);
binaries.pop();

let bitCounter = null
let MOST_COMMON = 0;
let LEAST_COMMON = 0;

/* I did one at a time and multiplied manually... */
itterateBinaries(binaries, 0, binaries[0].length, true);
itterateBinaries(binaries, 0, binaries[0].length, false);

console.log(LEAST_COMMON*MOST_COMMON);

function itterateBinaries(bins, currID, maxID, most){
    let bitCounter = null

    bins.forEach((binary, index, array) => {
        if (!bitCounter) {
            bitCounter = new Array(binary.length).fill(0);
        }

        if (binary) {
            const bitArray = [...binary].map(Number);
            bitCounter = bitArray.map((bit, i) => bit + bitCounter[i]);
        }
        if (index === array.length - 1) {
            let mostCommon = null
            mostCommon = most ? bitCounter.map((bit)=> Number(bit>=bins.length/2)) : bitCounter.map((bit)=> Number(bit<bins.length/2));
       
            if (bins.length > 1){
                for (var id = 0; id < bins.length; id++) {
                    if (parseInt(bins[id][currID]) !== mostCommon[currID]){
                        bins.splice(id, 1);
                        id--;
                    }
                }
            }
        }
    });

    currID++;
    if (currID < maxID) {
        console.log([currID, maxID], "current itteration");
        itterateBinaries(bins, currID, maxID, most);
    } else {
        console.log(parseInt(bins.join(""),2));
        if (most) {
            MOST_COMMON = parseInt(bins.join(""),2);
        }else{
            LEAST_COMMON = parseInt(bins.join(""),2);
        }
    }
}