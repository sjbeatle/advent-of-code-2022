import { input as elfCalories } from '../input';

const topThreeCals = elfCalories
  .split('\n\n')
  .map(
    cals => cals
      .split('\n')
      .reduce((p, c) => p + parseInt(c), 0),
  )
  .sort((a, b) => a > b ? -1 : 0)
  .slice(0, 3)
  .reduce((p, c) => p + c, 0);

console.log('The top three Elves are carrying a total:', topThreeCals);
// answer 212489
// example answer 45000
