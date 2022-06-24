let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

let crabs = input[0].split(',').map(value => parseInt(value))

function partA() {
    let min = Math.min(...crabs)
    let max = Math.max(...crabs)
    let sums = []
    
    for (let n = min; n <= max; n++) {
        sums.push(0)
        let pos = n - min
        crabs.forEach(crab => {
            sums[pos] += (Math.abs(crab - pos))
        })
    }
    
    console.log("The optimized position is: " + Math.min(...sums))
}
partA()

function partB() {
    let min = Math.min(...crabs)
    let max = Math.max(...crabs)
    let sums = []
    
    for (let n = min; n <= max; n++) {
        sums.push(0)
        let pos = n - min
        crabs.forEach(crab => {
            sums[pos] += (costFuel(Math.abs(crab - pos)))
        })
    }
    
    console.log("The optimized position in fuel cost is: " + Math.min(...sums))
}
partB()

function costFuel(pos) {
    let sum = 0
    for (let n = 1; n <= pos; n++) {
        sum += n
    }
    return sum
}