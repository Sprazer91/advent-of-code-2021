/* I Ran this in the console at https://adventofcode.com/2021/day/3/input */
const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
let numberOrder = input.shift();
numberOrder = numberOrder.split(",").map(Number);
// console.log(numberOrder)
let bingoBoards = [ ]

input.forEach(row => {
    if (row === "") {
        bingoBoards.push(new BingoChart([]))
    } else {
        let rowSingleSpaces = row.replace(/\s\s+/g, ' ').trim();
        // console.log(rowSingleSpaces.split(" ").map(Number))
        bingoBoards[bingoBoards.length - 1].rows.push(rowSingleSpaces.split(" ").map(Number))
    }
});
let foundMatch = false;
numberOrder.forEach(num => {
    if(!foundMatch){ 
        bingoBoards.forEach(board => {
            // console.log("testing board.rows", board.rows);
            foundMatch = board.setMatchedNumber(num);
        })
    }
})

function BingoChart(rows) {
    this.rows = rows;
    this.totalBoardValue = 0;
    this.totalUnselected = () => {
        const totalBoardValue = this.getTotalBoardValue();
        const totalMatchedNumbers = this.matchedNumbers.reduce(function (a, b) { return a + b; }, 0);
        return totalBoardValue - totalMatchedNumbers;
    };
    this.getTotalBoardValue = () => {
        let totalBoard = 0;
        this.rows.forEach(row => {
            totalBoard += row.reduce(function (a, b) { return a + b; }, 0);    
        });
        this.totalBoardValue = totalBoard;
        return this.totalBoardValue;
    }
    this.setMatchedNumber = (number) => {
        let returnVal = false
       this.rows.forEach(row => {
            row.forEach(d => {
            	if (d === number ){
                    this.matchedNumbers = [...this.matchedNumbers, number]
                    if (this.checkBingo()) {
                        returnVal  = true;   
                    }
                }
            }) 
        });
        return returnVal;
    };
    this.checkBingo = () => {
        let colCount = [0,0,0,0,0]
        this.rows.forEach(row => {
            let rowCount = 0;
            row.forEach((d,i) => {
                if (this.matchedNumbers.includes(d)) {
                rowCount++;
                colCount[i]++; 
                }
            });

            if (rowCount === row.length){
                this.bingo();
                return true;
            }
        });
        if (colCount.includes(5)){
            this.bingo();
            return true;
        }
        return false;
    };
    this.bingo = () => {
        if(!this.hasBingo) {
            console.log("Bingo!");
            console.log(this.matchedNumbers.at(-1) * this.totalUnselected(), "Multiplied");
            this.hasBingo = true
        }

    }
    this.hasBingo = false;
    this.matchedNumbers = [];
}
