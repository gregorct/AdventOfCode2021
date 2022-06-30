let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(line => line.split('').map(value => [parseInt(value), 0]))

let numFlashes = 0

let octopus = JSON.parse(JSON.stringify(input))

function partA() {
    
    let steps = 100
    
    for (let step = 0; step < steps; step++) {
        for (let i = 0; i < octopus.length; i++) {
            for (let j = 0; j < octopus[i].length; j++) {
                octopus[i][j][1] = 0
            }
        }
        for (let i = 0; i < octopus.length; i++) {
            for (let j = 0; j < octopus[i].length; j++) {
                increment(i, j)
            }
        }
    }
    
    console.log("The num of flashes is: " + numFlashes)
    
}
partA()

function partB() {
    octopus = JSON.parse(JSON.stringify(input))

    let findingSync = true
    let numStep = 0
    let numOctopus = octopus.length * octopus[0].length

    while(findingSync) {
        numStep++
        numFlashes = 0
        for (let i = 0; i < octopus.length; i++) {
            for (let j = 0; j < octopus[i].length; j++) {
                octopus[i][j][1] = 0
            }
        }
        for (let i = 0; i < octopus.length; i++) {
            for (let j = 0; j < octopus[i].length; j++) {
                increment(i, j)
            }
        }
        if(numFlashes == numOctopus) {
            findingSync = false
        }
    }

    console.log("All octopus flash in step: " + numStep)
}
partB()

function pulse(x, y) {
    if(octopus[x][y][1] == 0) {
        numFlashes++
        octopus[x][y][1] = 1
        octopus[x][y][0] = 0
        increment(x - 1, y - 1)
        increment(x, y - 1)
        increment(x + 1, y - 1)
        increment(x - 1, y)
        increment(x + 1, y)
        increment(x - 1, y + 1)
        increment(x, y + 1)
        increment(x + 1, y + 1)       
    }
}

function increment(x, y) {
    try {
        if(octopus[x][y][1] == 0) {
            octopus[x][y][0]++
            if(octopus[x][y][0] > 9) {
                pulse(x, y)
            }
        }
    } catch (error) {
        
    }
}