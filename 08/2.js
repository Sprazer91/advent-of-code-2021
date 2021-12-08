    const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
    input.pop();
    let result = 0;
    const easyNr = [2, 3, 4, 7];
    const easyDecode = [1, 7, 4, 8];
    input.forEach((row) => {
        const message = row.split(' | ');
        let numbers = message[1].split(' ');
        let total = [1000, 100, 10, 1];
        let i = 0;
        let code = message[0].split(' ');
        let decodeKey = new Array(7).fill([]);
        
        decodeKey = setInitialDecode(code, decodeKey);
        decodeKey = setExactCharsTwoAndFive(code, decodeKey);
        let numberThree = getNumberThree(code, decodeKey);
        numbers.forEach((n)=> {
            let number = 0;
            if (easyNr.indexOf(n.length) !== -1){
                number = easyDecode[easyNr.indexOf(n.length)];
            } else {
                /* 2, 3, 5 */
                if(n.length == 5) {
                    /* 3 or 2 */
                    if (n.includes(decodeKey[2])) {
                        /* 3 */
                        if (n.includes(decodeKey[5])) {
                            number = 3;
                        } else {
                            number = 2;
                        }
                    } else {
                        number = 5;
                    }
                }
                /* 0, 6, 9 */
                if(n.length == 6) {
                    /* 0 or 9 */
                    if (n.includes(decodeKey[2]) && n.includes(decodeKey[5])) {
                        /* check if inclues all chars in a three */
                        let matches = 0;
                        for(let letters = 0; letters < 5; letters++){
                            if(n.includes(numberThree[letters])){
                                matches++;
                            }
                        }
                        if (matches === 5){
                            number = 9;
                        } else {
                            number = 0;
                        }
                    } else {
                        number = 6;
                    }
                }
            }
            total[i] = total[i] * number;
            i++
        })
        result += total.reduce((a, b) => a + b, 0);
    })
    console.log(result, "Total result")

function setInitialDecode(code, decodeKey) {
    code.forEach((c) => {
        if(c.length === 2) {
            decodeKey[2] = decodeKey[2].concat(c.split(''));
            decodeKey[5] = decodeKey[5].concat(c.split(''));
        }
        if(c.length === 3) {
            decodeKey[0] = decodeKey[1].concat(c.split(''));
        }
    })
    decodeKey[0] = decodeKey[0].filter(x => !decodeKey[2].includes(x))[0];
    return decodeKey;
}

function setExactCharsTwoAndFive(code, decodeKey) {
    code.forEach((c)=> {
        if(c.length == 6 && decodeKey[2].length > 1) {
            /* Not both chars in a 1 */
            if (!(c.includes(decodeKey[2][0]) && c.includes(decodeKey[2][1]))) {
                const nrTwo = c.includes(decodeKey[2][0]) ? decodeKey[2][1] : decodeKey[2][0];
                const nrFive = (nrTwo == decodeKey[5][0]) ? decodeKey[2][1] : decodeKey[2][0];
                decodeKey[2] = nrTwo;
                decodeKey[5] = nrFive;
            }
        }
    });
    return decodeKey;
}

function getNumberThree(code, decodeKey) {
    let three = "";
    code.forEach((n)=> {
        if (n.length == 5) {
            /* 3 or 2 */
            if (n.includes(decodeKey[2])) {
                /* 3 */
                if (n.includes(decodeKey[5])) {
                    three = n;
                }
            }
        }
    })
    return three;
}
