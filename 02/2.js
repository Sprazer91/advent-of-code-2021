/* I Ran this in the console at https://adventofcode.com/2021/day/1/input */
const commands = document.querySelector("pre").innerHTML.split(/\r?\n/);
let y = 0;
let x = 0;
let aim = 0;
commands.forEach((command) => {
    if(command) {
        let parts = command.split(" ");
        if (command[0] === "f") {
            x += parseInt(parts[1]);
            y += parseInt(parts[1]) * aim;
        }
        if (command[0] === "u") {
            aim -= parseInt(parts[1]);
        }
        if (command[0] === "d") {
            aim += parseInt(parts[1]);
        }
    }
});
console.log(x*y);