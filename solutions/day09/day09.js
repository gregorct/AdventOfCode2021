let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(String)

let heigthMap = input.map(line => line.split('').map(num => parseInt(num)))


function partA() {
    let minSum = 0
    for (let x = 0; x < heigthMap.length; x++) {
        for (let y = 0; y < heigthMap[x].length; y++) {
            let isMinus = true
            if(x != 0) {
                if(heigthMap[x][y] >= heigthMap[x - 1][y]) {
                    isMinus = false      
                }
            }
            if(x != heigthMap.length - 1) {
                if(heigthMap[x][y] >= heigthMap[x + 1][y]) {
                    isMinus = false 
                }
            }
            if(y != 0) {
                if(heigthMap[x][y] >= heigthMap[x][y - 1]) {
                    isMinus = false
                }
            }
            if(y != heigthMap[x].length - 1) {
                if(heigthMap[x][y] >= heigthMap[x][y + 1]) {
                    isMinus = false
                }
            }
            if(isMinus) {
                minSum += heigthMap[x][y] + 1
            }
            
        }
    }
    console.log("The sum of the risk levels is: " + minSum)
}
partA()

function partB() {
    let minHeigths = getMinHeigths(heigthMap)
    let basins = []
    minHeigths.forEach(point => {
        basins.push(flow(heigthMap, point[0], point[1]))
    })

    let lengths = []
    let clearedBasins = basins.map(basin => clearBasin(basin))

    clearedBasins.forEach(value => {
        lengths.push(value.length)
    })

    let largestBasins = lengths.sort((a, b) => b - a)
    let multiplyLargestBasins = largestBasins[0] * largestBasins[1] * largestBasins[2]
    
    console.log("The multiply of the three largest basins is: " + multiplyLargestBasins)
}
partB()

function flow(map, x, y) {
    let basin = []
    let nextHeigth = map[x][y] + 1
    if(nextHeigth != 9) {
        if(x != 0) {
            if( nextHeigth == map[x - 1][y]) {
                basin = basin.concat(flow(map, x - 1, y))    
            }
        }
        if(x != map.length - 1) {
            if(nextHeigth == map[x + 1][y]) {
                basin = basin.concat(flow(map, x + 1, y))
            }
        }
        if(y != 0) {
            if(nextHeigth == map[x][y - 1]) {
                basin = basin.concat(flow(map, x, y - 1))
            }
        }
        if(y != map[x].length - 1) {
            if(nextHeigth == map[x][y + 1]) {
                basin = basin.concat(flow(map, x, y + 1))
            }
        }
    }
    basin.push([x, y])
    return basin
}

function clearBasin(basin) {
    let clearBasin = []
    basin.forEach(value => {
        if(containsPoint(value, clearBasin) == false) {
            clearBasin.push(value)
        }
    })
    return clearBasin
}

function containsPoint(basin, basins) {
    let contains = false
    basins.forEach(item => {
        if(basin[0] == item[0] && basin[1] == item[1]) {
            contains = true
        }
    })
    return contains
}

function getMinHeigths(map) {
    let minHeigths = []
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            let isMinus = true
            if(x != 0) {
                if(map[x][y] >= map[x - 1][y]) {
                    isMinus = false      
                }
            }
            if(x != map.length - 1) {
                if(map[x][y] >= map[x + 1][y]) {
                    isMinus = false 
                }
            }
            if(y != 0) {
                if(map[x][y] >= map[x][y - 1]) {
                    isMinus = false
                }
            }
            if(y != map[x].length - 1) {
                if(map[x][y] >= map[x][y + 1]) {
                    isMinus = false
                }
            }
            if(isMinus) {
                minHeigths.push([x, y])
            }
        }
    }
    return minHeigths
}