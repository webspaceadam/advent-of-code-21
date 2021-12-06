const path = require("path");
const fs = require("fs");

let fishtimerList = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .split(",")
  .map(Number);

// It takes 7 periods to get new fish
const PERIOD = 7;
// It takes a new period and 2 more iterations for a brand new fish to generate another one
const BIRTH_TIMER = PERIOD + 2;

// caching
let familySize = {}

/**
 * When a fish has a timer zero and a given period of time,
 * calculate how big its family will be at the end of the period
 */
function getFamilySizeAtPeriodEnd(daysLeft) {
    if (daysLeft <= 0) {
        return 1;
    }
    
    // when days left are not calculated yet, calculate them
    if(!familySize[daysLeft]) {
        familySize[daysLeft] = getFamilySizeAtPeriodEnd(daysLeft - PERIOD) +
            getFamilySizeAtPeriodEnd(daysLeft - BIRTH_TIMER);
    }
    // return cached (or recently-computed) value
    return familySize[daysLeft]
}

function numOfFishAtEndOfPeriod(initialTimers, days) {
    return initialTimers.map(
        timer => getFamilySizeAtPeriodEnd(days - timer)
    ).reduce((a, b) => a + b);
}

/**
 * Part 1
 */
console.log("For Part 1: ", numOfFishAtEndOfPeriod(fishtimerList, 80));

/** 
 * Part 2
 */
console.log("For Part 2: ", numOfFishAtEndOfPeriod(fishtimerList, 256));