const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
input.pop();
let counter = 0;
const easyNr = [2, 3, 4, 7];

input.forEach(row => {
    const message = row.sort().split(' | ');
    let numbers = message[1].split(' ');
    numbers.forEach(n => {
        if(easyNr.includes(n.length)){
            counter++;
        }
    })
})
console.log(counter, "counter")
