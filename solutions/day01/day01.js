let input = require('fs').readFileSync('input.inp', 'utf-8').split(/\r?\n/)
input = input.map(Number)

function partA() {
 let increses = 0
 let previousMeasurement = -1

 input.forEach((measurement) => {
  if(measurement > previousMeasurement && previousMeasurement != -1) {
    increses++
  }
  previousMeasurement = measurement
 })
 console.log("Total measurements are larger than previous measurement: " + increses)
}
partA()


function partB() {
  let sumIncreased = 0
  let lastSum = -1
  for (let index = 0; index < input.length - 2; index++) {
    let actualSum = input[index] + input[index + 1] + input[index + 2]
    if(actualSum > lastSum && lastSum != -1) {
      sumIncreased++
    }
    lastSum = actualSum 
  }
  console.log("Total sums are larger than previous sum: " + sumIncreased)
}
partB()