import { intersection } from 'lodash';
import { input as rucksacks, lower, upper} from '../input';

const rucksackArray: string[][] = [];
let trackIndex = -1;
rucksacks
  .split('\n')
  .forEach((r, i) => {
    if (i % 3 === 0) {
      trackIndex = trackIndex + 1;
      rucksackArray.push([r]);
    } else {
      rucksackArray[trackIndex].push(r);
    }
  });

const matches = rucksackArray
  .map((cs) => intersection(cs[0].split(''), cs[1].split(''), cs[2].split(''))[0]);

const values = matches
  .map(m => {
    const lowerIndex = lower.indexOf(m);
    const upperIndex = upper.indexOf(m);
    return lowerIndex + (upperIndex === -1 ? 0 : upperIndex + 27);
  });

const sum = values.reduce((p, c) => p + c, 0);

console.log('What is the sum of the priorities of those item types?', sum);

// answer 2708
// example answer 70
