import { intersection } from 'lodash';
import { input as rucksacks, lower, upper} from '../input';

const rucksackArray = rucksacks
  .split('\n')
  .map(r => {
    const half = Math.ceil(r.length / 2);
    return [r.slice(0, half), r.slice(half)];
  });

const matchesByRucksack = rucksackArray
  .map((cs) => intersection(cs[0].split(''), cs[1].split(''))[0]);

const values = matchesByRucksack
  .map(m => {
    const lowerIndex = lower.indexOf(m);
    const upperIndex = upper.indexOf(m);
    return lowerIndex + (upperIndex === -1 ? 0 : upperIndex + 27);
  });

const sum = values.reduce((p, c) => p + c, 0);

console.log('What is the sum of the priorities of those item types?', sum);

// answer 8298
// example answer 157
