const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
let resultString = "";
const STEPS = 40;
let codes = [];
input.forEach(line => {
    if (line.includes(' ')) {
        let code = line.split(' -&gt; ');
        codes.push({find: code[0], replace: code[1]});
    } else {
        if (line.length > 1) {
            resultString = line
        }
    }
});

for (let step = 0; step < STEPS; step++) { 
    let tempString = ""
    for (let char = 0; char < resultString.length; char++) {
        if ( char + 1 < resultString.length) {
            let found = ""
            codes.forEach(c => {
                if (resultString[char]+resultString[char+1] == c.find) {
                    found = c.find[0] + c.replace;
                }
            });
            tempString += found ? found : resultString[char]
        }else {
            tempString += resultString[char]
        }
    }
    resultString = tempString;
    console.log(resultString, "step"+step)
}

let unique = [...resultString].reduce((res, char) => (res[char] = (res[char] || 0) + 1, res), {});
let sorted = Object.entries(unique).sort(([,a],[,b]) => a-b)

console.log(resultString, "resultString")
console.log(unique, "unique")
console.log(sorted, "sorted")
console.log(sorted[sorted.length - 1][1] - sorted[0][1], "answer")