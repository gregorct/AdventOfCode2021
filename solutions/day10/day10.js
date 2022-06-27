let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

function partA() {
    let sumIncorrectCharacters = 0
    input.forEach(line => {
        sumIncorrectCharacters += getPoints(checkLine(line))
    })

    console.log("The total syntax error score is: " + sumIncorrectCharacters)
}
partA()

function partB() {
 let points = []
 input.forEach(line => {
    let point = getAutocompletePoints(line)
    if(point != 0) {
        points.push(point)
    }
})
points = points.sort((a, b) => a - b)
console.log("The middle score for autocomplete is: " + points[(Math.ceil(points.length/2)) - 1])
}
partB()

function getAutocompletePoints(line) {
    let poolCharacters = []
    for (let i = 0; i < line.length; i++) {  
        let actualCharacter = line[i]
        if(poolCharacters.length == 0) {
            poolCharacters.push(actualCharacter)
        } else {
            if(isOpenCharacter(actualCharacter)) {
                poolCharacters.push(actualCharacter)
            } else {
                if(poolCharacters[poolCharacters.length - 1] == inverse(actualCharacter)) {
                    poolCharacters.pop()
                } else {
                    return 0
                }
            }
        }
    }

    let sumPoints = 0
    for (let i = poolCharacters.length - 1; i >= 0; i--) {
        sumPoints = sumPoints * 5
        sumPoints += getAutocompletePoint(poolCharacters[i])
    }
    return sumPoints
    
}

function checkLine(line) {
    let poolCharacters = []
    for (let i = 0; i < line.length; i++) {  
        let actualCharacter = line[i]
        if(poolCharacters.length == 0) {
            poolCharacters.push(actualCharacter)
        } else {
            if(isOpenCharacter(actualCharacter)) {
                poolCharacters.push(actualCharacter)
            } else {
                if(poolCharacters[poolCharacters.length - 1] == inverse(actualCharacter)) {
                    poolCharacters.pop()
                } else {
                    return actualCharacter
                }
            }
        }
    }
    return ''   
}

function getAutocompletePoint(character) {
    switch (character) {
        case '(':
            return 1
        case '{':
            return 3
        case '[':
            return 2
        case '<':
            return 4
    
        default:
            return 0
    }
}

function inverse(character) {
    switch (character) {
        case ')':
            return '('
        case '}':
            return '{'
        case ']':
            return '['
        case '>':
            return '<'
    
        default:
            return ''
    }
}

function isOpenCharacter(character) {
    switch (character) {
        case '(':
            return true
        case '{':
            return true
        case '[':
            return true
        case '<':
            return true
    
        default:
            return false
    }
}

function getPoints(character) {
    switch (character) {
        case ')':
            return 3
        case ']':
            return 57
        case '}':
            return 1197
        case '>':
            return 25137
    
        default:
            return 0
    }
}

