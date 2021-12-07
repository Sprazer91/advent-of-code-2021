const input = document.querySelector("pre").innerHTML.split(/\r?\n/);
let PointArray = []
let LineArray = []

input.forEach( (line) => {
    let fromTo = line.split(' -&gt; ');
    let from = fromTo[0].split(',');
    if (fromTo[1]) {
        let to = fromTo[1].split(',');
        from[0] = parseInt(from[0])
        to[0] = parseInt(to[0])
        from[1] = parseInt(from[1])
        to[1] = parseInt(to[1])
        
        if (from[0] === to[0]) {
            let yMin = from[1] < to[1] ? from[1] : to[1]
            let yMax = from[1] >= to[1] ? from[1] : to[1]
            for (let index = yMin; index <= yMax; index++) {
                let point = from[0]+","+index
                if(LineArray.includes(point)){
                    if (PointArray.includes(point)){
                    }else{
                        PointArray.push(point)
                    }
                }else{
                    LineArray.push(point)
                }
                LineArray.push()
            }
        } else if (from[1] === to[1]) {
            let xMin = from[0] < to[0] ? from[0] : to[0]
            let xMax = from[0] >= to[0] ? from[0] : to[0]
            for (let index = xMin; index <= xMax; index++) {
                let point = index+","+from[1]
                if(LineArray.includes(point)){
                    if (PointArray.includes(point)){
                        
                    }else{
                        PointArray.push(point)
                    }
                    
                }else{
                    LineArray.push(point)
                }
                LineArray.push()
            }
        } else if (Math.abs(from[1] - to[1]) === Math.abs(from[0] - to[0])) {
            let diff = Math.abs(from[0] - to[0])
            let xDirection = from[0] > to[0] ? -1 : 1; 
            let yDirection = from[1] > to[1] ? -1 : 1; 
            for (let index = 0; index <= diff; index++) {
                let point = (from[0]+index*xDirection) + "," + (from[1]+index*yDirection);
                if (LineArray.includes(point)) {
                    if (PointArray.includes(point)) {
                        
                    } else{
                        PointArray.push(point)
                    }
                    
                } else {
                    LineArray.push(point)
                }
                LineArray.push() 
            }
        }
    }
})
console.log(PointArray.length)