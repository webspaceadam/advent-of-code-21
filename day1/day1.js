const fs = require('fs'); 

const measurements = fs.readFileSync('./day-1-input.csv', 'utf8').split('\n').map(Number);

/**
* PART A
*/
let increased = 0;

// go through each measurement and check if it is greater than the one before, if so increase the counter
function getIncreasedMeasurements() {
    for (let i = 0; i < measurements.length; i++) {
        if (measurements[i] > measurements[i - 1]) {
            increased++;
        }
    }
}

/**
 * PART B
 */
let sumOfMeasurements = [];
let increasedSums = 0;

function getSumOfMeasurementTriplets() {
    for (let i = 0; i < measurements.length; i++) {
        sumOfMeasurements.push(measurements[i] + measurements[i + 1] + measurements[i + 2]);
    }
}

getSumOfMeasurementTriplets();

function getIncreasedMeasurements() {
    for (let i = 0; i < sumOfMeasurements.length; i++) {
        if (sumOfMeasurements[i] > sumOfMeasurements[i - 1]) {
            increasedSums++;
        }
    }
}

getIncreasedMeasurements();

console.log(increasedSums);