const path = require("path");
const fs = require("fs");

let crabPositions = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(",")
  .map(Number);

function median(arr) {
    let middle = Math.floor(arr.length / 2);
    arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
};

/**
 * Calculate the consumption costs of moving all crabs to the given position to move
 * @param {Number} positionToMove
 * @returns {Number}
 */
function calculatePositionConsumption(positionToMove) {
    let positionConsumption = 0;
    crabPositions.forEach(position => {
        positionConsumption += Math.abs(position - positionToMove);
    });
    return positionConsumption;
}


/**
 * FOR PART 2
 */
function calculateIncrementalFuel(steps) {
    // keep in mind better solution from mirco return (steps * (steps + 1)) / 2;
    return [...Array(steps).keys()].reduce((acc, curr) => acc + (curr + 1), 0);
}

function calculateMinConsumptionForEngine(positionToMove) {
    let consumption = 0;
    crabPositions.forEach(position => {
        consumption += calculateIncrementalFuel(Math.abs(position - positionToMove));
    })
    return consumption;
}

function getMinConsumption() {
    let minFuel = Infinity;

    const uniquePositions = [...new Set(crabPositions)];

    uniquePositions.forEach(position => {
        const consumption = calculateMinConsumptionForEngine(position);
        if(consumption < minFuel) {
            minFuel = consumption;
        }
    })

    return minFuel;
}

/**
 * PART 1
 */
console.log("Consumption of moving all crabs to the middle position:", calculatePositionConsumption(median(crabPositions)));

/**
 * PART 2
 */
console.log("Best consumption for the crab submarine engines: ", getMinConsumption());
