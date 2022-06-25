let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

let instructions = []
input.forEach(line => {
    instructions.push(line.split(' | ').map(value => value.split(' ')))
})

function partA(){
let sum = 0
instructions.forEach(instruction => {

    instruction[1].forEach(digit => {
        let length = digit.length
        if(length == 2 || length == 3 || length == 4 || length == 7 ) {
            sum++
        }
    })
})

console.log("The digits 1, 4, 7 and 8 appears: " + sum)
}
//partA()

function partB() {
    let sum = 0
    instructions.forEach( instruction => {
        sum += parseInstruction(instruction)
    })
    console.log("The sum of the outputs is: " +  sum)
}
partB()

function parseInstruction(instruction) {
    let digits = ['', '', '', '', '', '', '', '', '', '']
    let output = instruction[1]
    let uniqueDigits = instruction[0]
    let nonParsed = []
    // size: 2 => 1, 3 => 7, 4 => 4, 7 => 8
    for (let i = 0; i < uniqueDigits.length; i++) {
        switch (uniqueDigits[i].length) {
            case 2:
                digits[1] = uniqueDigits[i]
                break
            case 3:
                digits[7] = uniqueDigits[i]
                break
            case 4:
                digits[4] = uniqueDigits[i]
                break
            case 7:
                digits[8] = uniqueDigits[i]
                break
            default:
                nonParsed.push(uniqueDigits[i])
                break
        }       
    }
    uniqueDigits = nonParsed
    nonParsed = []

    // Minus 7 digit: size: 2 => 3, size 4 => 6
    for (let i = 0; i < uniqueDigits.length; i++) {
        let removedCharacters = removeCharacters(digits[7], uniqueDigits[i])
        switch (removedCharacters.length) {
            case 2:
                digits[3] = uniqueDigits[i]
                break
            case 4:
                digits[6] = uniqueDigits[i]
                break
            default:
                nonParsed.push(uniqueDigits[i])
                break
        }    
    }
    uniqueDigits = nonParsed
    nonParsed = []

    // Minus 3: size: 2 => 0
    for (let i = 0; i < uniqueDigits.length; i++) {
        let removedCharacters = removeCharacters(digits[3], uniqueDigits[i])
        switch (removedCharacters.length) {
            case 2:
                digits[0] = uniqueDigits[i]
                break
            default:
                nonParsed.push(uniqueDigits[i])
                break
        }    
    }
    uniqueDigits = nonParsed
    nonParsed = []

    // Minus 4: size 3 => 2
    for (let i = 0; i < uniqueDigits.length; i++) {
        let removedCharacters = removeCharacters(digits[4], uniqueDigits[i])
        switch (removedCharacters.length) {
            case 3:
                digits[2] = uniqueDigits[i]
                break
            default:
                nonParsed.push(uniqueDigits[i])
                break
        }    
    }
    uniqueDigits = nonParsed
    nonParsed = []

    // size: 5 => 5, 6 => 9
    for (let i = 0; i < uniqueDigits.length; i++) {
        switch (uniqueDigits[i].length) {
            case 5:
                digits[5] = uniqueDigits[i]
                break
            case 6:
                digits[9] = uniqueDigits[i]
                break
        }       
    }

    // All digits are uncrypted

    let number = ''
    output.forEach(digit => {
        number += digits.findIndex(value => {
            return sortAlphabet(value) == sortAlphabet(digit)
        })
    })
    return parseInt(number)

}

function removeCharacters(origin, end) {
    let replaced = end
    for (let i = 0; i < origin.length; i++) {
        replaced = replaced.replace(origin[i], '')
    }
    return replaced
}

function sortAlphabet(text) {
    return text.split('').sort().join('');
}

