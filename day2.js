const fs = require('fs'); 

const commands = fs.readFileSync('./day2-input.csv', 'utf8').split('\n').map(String);

/**
 * PART 1 & 2
 */

let horizontal = 0;
let depth = 0;
let aim = 0;

function getHorizontal(command) {
    if (command.includes('forward')) {
        const forwardStep = Number(command.split(' ')[1]);
        horizontal += forwardStep;
        depth = depth + aim * forwardStep;
        console.log('hor, dep, aim, step', horizontal, depth, aim, forwardStep);
    }
}

function getAim(command) {
    if (command.includes('down')) {
        aim += Number(command.split(' ')[1]);
    } else if (command.includes('up')) {
        aim -= Number(command.split(' ')[1]);
    }
}

// go through every command in commands and get horizontal and depth
commands.forEach(command => {
    getHorizontal(command);
    getAim(command);
})

console.log(horizontal * depth, 'horizontal & depth & aim', horizontal, depth, aim);
