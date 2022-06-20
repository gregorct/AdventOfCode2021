let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

function partA() {
    let gammaTax = ""
    let epsilonTax = ""

    let size = input[0].length

    for (let i = 0; i < size; i++) {
        let bit0 = 0
        let bit1 = 0

        input.forEach((value) => {
            if(value[i] == "0") {
                bit0++
            } else {
                bit1++
            }
        })

        if(bit0 > bit1) {
            gammaTax += "0"
        } else {
            gammaTax += "1"
        }
    }

    epsilonTax = convertGammaToEpsilon(gammaTax)

    let gammaValue = parseInt(gammaTax, 2)
    let epsilonValue = parseInt(epsilonTax, 2)

    console.log("Gamma tax: " + gammaValue)
    console.log("Epsilon tax: " + epsilonValue)
    console.log("PowerConsumption: " + gammaValue * epsilonValue)
}
partA()

function partB() {
    let list = input
    let index = 0
    do {
        list = mostCommonBitCriteria(list, index++)
    } while(list.length != 1)

    let oxigenGeneratorRating = parseInt(list[0], 2)

    list = input
    index = 0
    do {
        list = leastCommonBitCriteria(list, index++)
    } while(list.length != 1)

    let co2ScrubberRating = parseInt(list[0], 2)

    console.log("Oxigen Generator Rating: " + oxigenGeneratorRating)
    console.log("C02 Scrubber Rating: " + co2ScrubberRating)
    console.log("Life Support Rating: " + oxigenGeneratorRating * co2ScrubberRating)



}
partB()

function convertGammaToEpsilon(value) {
    let result = ""
    for (let i = 0; i < value.length; i++) {
        if(value[i] == "0") {
            result += "1"
        } else {
            result += "0"
        }
        
    }
    return result
}

function mostCommonBitCriteria(list, index) {
    let result = []
    let bitSelected = ""
    let bit0 = 0
    let bit1 = 0

    list.forEach((value) => {
        if(value[index] == "0") {
            bit0++
        } else {
            bit1++
        }
    })

    if(bit1 >= bit0) {
        bitSelected = "1"
    } else {
        bitSelected = "0"
    }

    list.forEach((value) => {
        if(value[index] == bitSelected) {
            result.push(value)
        }
    })

    return result

}

function leastCommonBitCriteria(list, index) {
    let result = []
    let bitSelected = ""
    let bit0 = 0
    let bit1 = 0

    list.forEach((value) => {
        if(value[index] == "0") {
            bit0++
        } else {
            bit1++
        }
    })

    if(bit0 <= bit1) {
        bitSelected = "0"
    } else {
        bitSelected = "1"
    }

    list.forEach((value) => {
        if(value[index] == bitSelected) {
            result.push(value)
        }
    })

    return result

}
