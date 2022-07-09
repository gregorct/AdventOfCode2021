let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)


let sheet = []
let sheetNodes = []
let instructions = []
let sheetReg = new RegExp('[0-9]+,[0-9]+')
input.forEach(line => {
    if(sheetReg.test(line)) {
        sheetNodes.push(line)
    } else {
        instructions.push(line)
    }
})
instructions.shift()

sheetNodes = sheetNodes.map(value => value.split(',').map(item => parseInt(item)))
instructions = instructions.map(value => value.substring(11).split('='))
instructions.forEach(line=> {
    line[1] = parseInt(line[1])
})
//let numColumns = Math.max(...sheetNodes[0]) + 1
//let numRows = Math.max(...sheetNodes[1]) + 1

let numColumns = 0
let numRows = 0
sheetNodes.forEach(node => {
    let nodeX = node[0]
    let nodeY = node[1]
    if(nodeX > numColumns) {
        numColumns = nodeX
    }
    if(nodeY > numRows) {
        numRows = nodeY
    }
})
numColumns++
numRows++

//sheet = Array(numRows).fill(Array(numColumns).fill('.'))
for (let x = 0; x < numRows; x++) {
    sheet.push([])
    for (let y = 0; y < numColumns; y++) {
        sheet[x].push('.')
    }
}

sheetNodes.forEach(node => {
    let nodeX = node[0]
    let nodeY = node[1]
    sheet[nodeY][nodeX] = '#' 
})

function partA() {
    let transparentSheet = JSON.parse(JSON.stringify(sheet))
    instructions.forEach(instruction => {
        fold(transparentSheet, instruction)
    })
    console.log(transparentSheet)
}
partA()

function fold(sheet, instruction) {
    switch (instruction[0]) {
        case 'y':
            foldHorizontal(sheet, instruction[1])
            break;
        case 'x':
            foldVertical(sheet, instruction[1])
            break;
    }
}

function foldHorizontal(sheet, position) {
    for (let i = 0; i < position; i++) {
        let line = sheet.pop()
        for (let n = 0; n < line.length; n++) {
            if(line[n] == '#') {
                sheet[i][n] = '#'
            }
        }
        sheet.pop()
    }
}

function foldVertical(sheet, position) {
    for (let i = 0; i < sheet.length; i++) {
        for (let n = 0; n < position; n++) {
            let item = sheet[i].pop()
            if(item == '#') {
                sheet[i][n] = '#'
            }
        }
        sheet[i].pop()
    }
}

