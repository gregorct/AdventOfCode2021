const { text } = require('stream/consumers')

let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(line => line.split('-'))

let caves = new Map()
input.forEach(pair => {
    let keyA = pair[0]
    let keyB = pair[1]

    if(caves.has(keyA)) {
        caves.get(keyA).push(keyB)
    } else {
        caves.set(keyA, [keyB])
    }

    if(caves.has(keyB)) {
        caves.get(keyB).push(keyA)
    } else {
        caves.set(keyB, [keyA])
    }
})

function partA() {
    let paths = walk('start')
    console.log("The number of paths visit smallCaves: " + checkSmallCavesVisited(paths))
}
partA()

function partB() {
    let paths = walk('start', [], "", true)
    console.log("The number of paths in this system is:" + paths.length)
}
partB()

function walk(key, paths = [], path = "", allowRevisitSmallCave = false) {

    if(key == "start") {
        path = "start -> "
    }
    caves.get(key).forEach(route => {
        if(route != "end") {
            if(allowNextCave(route, path)) {
                walk(route, paths, path + route + " -> ", allowRevisitSmallCave)
            } else {
                if(allowRevisitSmallCave && route != "start") {
                    walk(route, paths, path + route + " -> ", false)
                }
            }
        } else {
            if(validPath(key, path)) {
                paths.push(path + "end")
            }
        }
    })

    if(key == "start") {
        return paths
    }

}

function allowNextCave(cave, path) {
    if(cave.toUpperCase() == cave) {
        return true
    }
    return !path.includes(cave)
}

function validPath(cave, path) {
    return path.includes(cave)
}

function checkSmallCavesVisited(paths) {
    let numPaths = 0
    paths.forEach(path => {
        let sanitizedPath = path.replace('start', '').replace('end', '')
        if(sanitizedPath.toUpperCase() != sanitizedPath) {
            numPaths++
        }
    })
    return numPaths
}