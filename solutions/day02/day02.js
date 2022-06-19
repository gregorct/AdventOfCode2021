let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

function partA() {
    let depth = 0
    let position = 0
    input.forEach((line) => {
        let instruction = line.split(" ")
        let value = parseInt(instruction[1])

        switch(instruction[0]) {
            case "forward": 
                position += value
                break
            case "up": 
                depth -= value
                break
            case "down":
                depth += value
                break
        }
    })
    console.log("Current position: " + position)
    console.log("Current depth: " + depth)
    console.log("The multiplication of depth and position is: " + position * depth)
}
partA()

function partB() {
    let depth = 0
    let position = 0
    let aim = 0
    input.forEach((line) => {
        let instruction = line.split(" ")
        let value = parseInt(instruction[1])

        switch(instruction[0]) {
            case "forward": 
                position += value
                depth += value * aim
                break
            case "up": 
                aim -= value
                break
            case "down":
                aim += value
                break
        }
    })
    console.log("Current position: " + position)
    console.log("Current depth: " + depth)
    console.log("The multiplication of depth and position is: " + position * depth)
}
partB()