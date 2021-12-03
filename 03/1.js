/* I Ran this in the console at https://adventofcode.com/2021/day/3/input */
const binaries = document.querySelector("pre").innerHTML.split(/\r?\n/);
let bitCounter = null
binaries.forEach((binary) => {
  if(!bitCounter){
    bitCounter = new Array(binary.length).fill(0);
  }
  
  if (binary){
    const bitArray = [...binary].map(Number);
    bitCounter = bitArray.map((bit, i) => bit + bitCounter[i]);
  }else{
  	binaries.pop();
  }
});
const mostCommon = bitCounter.map((bit)=> Number(bit<binaries.length/2));
const leastCommon = bitCounter.map((bit)=> Number(bit>binaries.length/2));
const gamma = parseInt(mostCommon.join(""),2);
const epsilon = parseInt(leastCommon.join(""),2);
console.log(gamma*epsilon);