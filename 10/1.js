const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
input.pop();
const brackets = {
    ")": "(",
    "}": "{",
    "]": "[",
    ">": "<",
};

const bracketPoints = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const bracketPointsAutoComplete = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
};

let illegal = [];
let autocomplete = [];
input.forEach(line => {
    let openBrackets = [];
    let foundIllegal = false;
    line = line.replace(/&gt;/g, '>');
    line = line.replace(/&lt;/g, '<');
    line.split('').forEach(char => {
        /* corrupted line */
        if (!foundIllegal){
            /* closing bracket */
            if (brackets[char]){
                let lastOpened = openBrackets.pop()
                if (brackets[char] !== lastOpened) {
                    illegal.push(bracketPoints[char]);
                    foundIllegal = true;
                }
            } else {
                openBrackets.push(char);
            }
        }
    })
    if (!foundIllegal){
        let totalScore = 0;
        openBrackets = openBrackets.reverse();
        openBrackets.forEach(v => {
            totalScore = totalScore * 5 + bracketPointsAutoComplete[v]
        })
        autocomplete.push(totalScore);
    }
})
autocomplete = autocomplete.sort((a, b) => a - b)
console.log(illegal.reduce((a, b) => a + b, 0), "Part 1")
console.log(autocomplete[(autocomplete.length - 1) / 2], "Part 2")