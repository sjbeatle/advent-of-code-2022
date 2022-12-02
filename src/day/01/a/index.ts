import { input as elfCalories } from '../input';

const calPerElf = elfCalories.split('\n\n').map(cals => cals.split('\n').reduce((p, c) => p + parseInt(c), 0));

console.log('The Elf carrying the most Calories is carrying:', Math.max(...calPerElf));
// answer 24000
// example answer 71780
