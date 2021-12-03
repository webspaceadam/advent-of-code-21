/**
 * (called the gamma rate and the epsilon rate). 
 * The power consumption can then be found 
 * by multiplying the gamma rate by the epsilon rate.
 */

const fs = require('fs');
const measurements = fs.readFileSync('./day3-input.csv', 'utf8').split('\n').map(String);

/**
 * PART 1
 */

const members = new Array(measurements[0].length);

for (i = 0; i < members.length; i++) {
    members[i] = [0,0];
}

function addMembers() {
    measurements.forEach(binaryNumber => {
        for (i = 0; i < binaryNumber.length; i++) {
            if(Number(binaryNumber[i]) === 1) {
                members[i][1] += 1;
            } else {
                members[i][0] += 1;
            }
        }
    })
}

addMembers();

function createNewGammaBinary() {
    let newBinaryString = '';

    members.forEach(member => {
        if(member[0] > member[1]) {
            newBinaryString = newBinaryString + '0';
        } else {
            newBinaryString = newBinaryString + '1'
        }
    })

    return newBinaryString;
}

function createNewEpsilonBinary() {
    let newBinaryString = '';

    members.forEach(member => {
        if(member[0] > member[1]) {
            newBinaryString = newBinaryString + '1';
        } else {
            newBinaryString = newBinaryString + '0'
        }
    })

    return newBinaryString;
}

const gamma = parseInt(createNewGammaBinary(), 2);
const epsilon = parseInt(createNewEpsilonBinary(), 2);

console.log(gamma * epsilon);

/**
 * PART 2
 * 
 * Next, you should verify the life support rating, which can be determined by multiplying the oxygen generator rating by the CO2 scrubber rating.
 */
let oxygenGeneratorRating = 0;
let co2ScrubberRating = 0;

function getNewBitPosition(bitPosition) {
    if(bitPosition === 11) {
        return 0;
    } else {
        return bitPosition + 1;
    }
}

function getOxygenGeneratorRating(measurements, bitPosition) {
    if (measurements.length === 1) {
        return parseInt(measurements[0], 2);
    } else {
        const bit0List = [];
        const bit1List = [];
        let filteredMeasurements = [];

        measurements.forEach(measure => {
            Number(measure[bitPosition]) === 0 ? bit0List.push(measure) : bit1List.push(measure);
        })

        if(bit0List.length > bit1List.length) {
            filteredMeasurements = measurements.filter(measure => bit0List.includes(measure));
        } else {
            filteredMeasurements = measurements.filter(measure => bit1List.includes(measure));
        }

        return getOxygenGeneratorRating(filteredMeasurements, getNewBitPosition(bitPosition));
    }
}

function getCO2ScrubberRating(measurements, bitPosition) {
    if (measurements.length === 1) {
        return parseInt(measurements[0], 2);
    } else {
        const bit0List = [];
        const bit1List = [];
        let filteredMeasurements = [];

        measurements.forEach(measure => {
            Number(measure[bitPosition]) === 0 ? bit0List.push(measure) : bit1List.push(measure);
        })

        if(bit0List.length < bit1List.length || bit0List.length === bit1List.length) {
            filteredMeasurements = measurements.filter(measure => bit0List.includes(measure));
        } else {
            filteredMeasurements = measurements.filter(measure => bit1List.includes(measure));
        }

        return getCO2ScrubberRating(filteredMeasurements, getNewBitPosition(bitPosition));
    }
}

oxygenGeneratorRating = getOxygenGeneratorRating(measurements, 0);
co2ScrubberRating = getCO2ScrubberRating(measurements, 0);

console.log(oxygenGeneratorRating * co2ScrubberRating);