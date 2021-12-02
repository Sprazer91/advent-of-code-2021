/* I Ran this in the console at https://adventofcode.com/2021/day/1/input */
const commands = document.querySelector("pre").innerHTML.split(/\r?\n/);
let y = 0;
let x = 0;
commands.forEach((command, index) => {
    if(command) {
        let parts = command.split(" ");
        if (command[0] === "f") {
            console.log(parseInt(parts[1]))
            x += parseInt(parts[1]);
        }
        if (command[0] === "u") {
            y -= parseInt(parts[1]);
        }
        if (command[0] === "d") {
            y += parseInt(parts[1]);
        }
    }
});
console.log(commands.length);
console.log(x, "x");
console.log(y, "y");
console.log(x*y);