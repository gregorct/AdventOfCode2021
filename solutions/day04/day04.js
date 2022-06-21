let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

function partA() {
    let numbers = input[0].split(",").map((value) => parseInt(value))
    let boards = []
    let board = []
    let winner = -1
    let numberWinner = -1
    
    for (let i = 2; i < input.length; i++) {
        if(input[i] != '') { 
            board.push(input[i].split(' ').filter((value) => value != '').map((value) => [parseInt(value), 0]))
        } else {
            boards.push(board)
            board = []
        }
    }
    
    for (let n = 0; n < numbers.length; n++) {
        // Write number in board
        for (let i = 0; i < boards.length; i++) {
            let columnCheck = [0, 0, 0, 0, 0]
            for (let j = 0; j < 5; j++) {
                let rowCheck = 0
                for (let k = 0; k < 5; k++) {
                    if(boards[i][j][k][0] == numbers[n]) {
                        boards[i][j][k][1] = 1
                    }
                    if(boards[i][j][k][1] == 1) {
                        rowCheck++
                        columnCheck[k]++
                    }
                }
                if(rowCheck == 5) {
                    winner = i
                    numberWinner =  numbers[n]
                    break
                }
            }
            columnCheck.forEach((column) => {
                if(column == 5) {
                    winner = i
                    numberWinner = numbers[n]
                }
            })
            if(winner != -1) break
        }
        if(winner != -1) break
    }
    
    let sumUnmarked = 0
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(boards[winner][i][j][1] == 0) sumUnmarked += boards[winner][i][j][0]
        }
        
    }
    
    console.log("The result for the winner is: " + sumUnmarked * numberWinner)
}
partA()

function partB() {
    let numbers = input[0].split(",").map((value) => parseInt(value))
let boards = []
let board = []
let winner = -1
let numberWinner = -1
let winners = 0

for (let i = 2; i < input.length; i++) {
    if(input[i] != '') { 
        board.push(input[i].split(' ').filter((value) => value != '').map((value) => [parseInt(value), 0]))
    } else {
        boards.push([board, 0])
        board = []
    }
}

for (let n = 0; n < numbers.length; n++) {
    // Write number in board
    for (let i = 0; i < boards.length; i++) {
        let columnCheck = [0, 0, 0, 0, 0]
        for (let j = 0; j < 5; j++) {
            let rowCheck = 0
            for (let k = 0; k < 5; k++) {
                if(boards[i][0][j][k][0] == numbers[n]) {
                    boards[i][0][j][k][1] = 1
                }
                if(boards[i][0][j][k][1] == 1) {
                    rowCheck++
                    columnCheck[k]++
                }
            }
            if(rowCheck == 5) {
                if(boards[i][1] != 1) {
                    boards[i][1] = 1
                    winners++
                    numberWinner =  numbers[n]
                    winner = i
                }
                if(boards.length == winners) break
            }
        }
        columnCheck.forEach((column) => {
            if(column == 5) {
                if(boards[i][1] != 1) {
                    boards[i][1] = 1
                    winners++
                    numberWinner =  numbers[n]
                    winner = i
                }
            }
            
        })
        if(boards.length == winners) break
    }
    if(boards.length == winners) break
}

let sumUnmarked = 0
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if(boards[winner][0][i][j][1] == 0) sumUnmarked += boards[winner][0][i][j][0]
    }
    
}

console.log("The result for the last winner is: " + sumUnmarked * numberWinner)
}
partB()
