let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

let instructions = []
input.forEach((line) => {
    let decode = line.split(' -> ').map((value) => value.split(',')).map((point) => [parseInt(point[0]), parseInt(point[1])])
    instructions.push(decode)
})

function partA() {
    let lines = []
    for (let i = 0; i < instructions.length; i++) {
        let x0 = instructions[i][0][0]
        let y0 = instructions[i][0][1]
        let x1 = instructions[i][1][0]
        let y1 = instructions[i][1][1]
        if(x0 == x1 || y0 == y1) {
            let line = getLine(x0, y0, x1, y1)
            lines.push(line)
        }
    }
    
    let cartesians = []
    lines.forEach((line) => {
        for (let n = 0; n < line.length; n++) {
            let newCell = true
            for (let i = 0; i < cartesians.length; i++) {
                if(cartesians[i][0][0] == line[n][0] && cartesians[i][0][1] == line[n][1]) {
                    cartesians[i][1]++
                    newCell = false
                    break
                }
            } 
            if(newCell) cartesians.push([line[n], 1])
        }
    })
        
    let pointCrossed = 0
    cartesians.forEach((point) => {
        if(point[1] >= 2) pointCrossed++
    })
    
    console.log("Points crossed: " + pointCrossed)
}
partA()

function partB() {
    let lines = []
    for (let i = 0; i < instructions.length; i++) {
        let x0 = instructions[i][0][0]
        let y0 = instructions[i][0][1]
        let x1 = instructions[i][1][0]
        let y1 = instructions[i][1][1]
        
        let line = getLine(x0, y0, x1, y1)
            lines.push(line)
    }
    
    let cartesians = []
    lines.forEach((line) => {
        for (let n = 0; n < line.length; n++) {
            let newCell = true
            for (let i = 0; i < cartesians.length; i++) {
                if(cartesians[i][0][0] == line[n][0] && cartesians[i][0][1] == line[n][1]) {
                    cartesians[i][1]++
                    newCell = false
                    break
                }
            } 
            if(newCell) cartesians.push([line[n], 1])
        }
    })
        
    let pointCrossed = 0
    cartesians.forEach((point) => {
        if(point[1] >= 2) pointCrossed++
    })
    
    console.log("Points total crossed: " + pointCrossed)
}
partB()

function getLine(x0, y0, x1, y1) {

    let nTimes = 0
    let xIncrement = 0
    let yIncrement = 0

    let distanceX = Math.abs(x0 - x1)
    let distanceY = Math.abs(y0 - y1)

    if(distanceX == 0) {
        nTimes = distanceY
        if(y1 > y0) {
            yIncrement = 1
        } else {
            yIncrement = -1
        }
    } else if (distanceY == 0) {
        nTimes = distanceX
        if(x1 > x0) {
            xIncrement = 1
        } else {
            xIncrement = -1
        }

    } else {
        nTimes = distanceX
        if(x1 > x0) {
            xIncrement = 1
        } else {
            xIncrement = -1
        }
        if(y1 > y0) {
            yIncrement = 1
        } else {
            yIncrement = -1
        }
    }

    let points = [[x0, y0]]

    for (let i = 1; i <= nTimes ; i++) {
        points.push([x0 + (xIncrement * i), y0 + (yIncrement * i)])
    }
    return points

}


