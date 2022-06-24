let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

let cells = []

input.forEach((line) => {
    cells = line.split(',').map((value) => parseInt(value))
})

function partA() {
    generateLanternFish(cells, 80)
}
//partA()

function partB() {
    let lanternFish = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    cells.forEach((fish) => {
        lanternFish[fish]++
    })
    for (let day = 1; day <= 256; day++) {
        let lanternfishToReproduce = lanternFish[0]
        lanternFish[0] = lanternFish[1]
        lanternFish[1] = lanternFish[2]
        lanternFish[2] = lanternFish[3]
        lanternFish[3] = lanternFish[4]
        lanternFish[4] = lanternFish[5]
        lanternFish[5] = lanternFish[6]
        lanternFish[6] = lanternFish[7]
        lanternFish[7] = lanternFish[8]
        lanternFish[8] = lanternfishToReproduce
        lanternFish[6] += lanternfishToReproduce
    }

    let totalOfLanternFish = 0
    lanternFish.forEach((lanternFish) => {
        totalOfLanternFish += lanternFish
    })
    console.log("Number of lanternfish: " + totalOfLanternFish)
}
partB()

function generateLanternFish(initial, days) {
    let lanternFishGroup = initial

    for (let n = 0; n < days; n++) {
        let newLanternFish = []
        for (let i = 0; i < lanternFishGroup.length; i++) {
            if(lanternFishGroup[i] == 0) {
                lanternFishGroup[i] = 6
                newLanternFish.push(8)
            } else {
                lanternFishGroup[i]--
            } 
        }
        lanternFishGroup = lanternFishGroup.concat(newLanternFish)
    }
    console.log("Number of lanternfish: " + lanternFishGroup.length)
}