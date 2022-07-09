let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

let template = input.shift()

input.shift()

let instructions = input.map(value => value.split(" -> "))

function partA() {
    let startTemplate = template
    let steps = 10
    for (let i = 0; i < steps; i++) {
        startTemplate = generate(startTemplate)
    }
    let results = minAndMax(startTemplate)
    console.log("The result of substract after 10 steps is: " + (results[1] - results[0]))
}
partA()

function partB() {
    let startTemplate = template
    let steps = 40
    for (let i = 0; i < steps; i++) {
        startTemplate = generate(startTemplate)
    }
    let results = minAndMax(startTemplate)
    console.log("The result of substract after 40 steps is: " + (results[1] - results[0]))
}
partB()

function generate(initial) {
    let final = ""
    for (let i = 0; i < initial.length - 1; i++) {
        let pair = initial.substring(i, i+2)
        let polymer = polymerInsert(pair)
        final += pair[0] + polymer
    }
    return final + initial[initial.length - 1]
}

function polymerInsert(pair) {
    let result = instructions.find(value => value[0] == pair)
    return result[1]
}

function minAndMax(template) {
    let unique = [...new Set(template.split(''))]
    let min = 0
    let max = 0
    unique.forEach(value => {
        var count = (template.match(RegExp(value, 'g')) || []).length
        if(min == 0 && max == 0) {
            min = count
            max = count
        } else {
            if(count < min) {
                min = count
            }
            if(count > max) {
                max = count
            }
        }
    })
    return [min, max]
}

