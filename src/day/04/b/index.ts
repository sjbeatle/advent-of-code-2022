import { input as sectionAssignmentPairs} from '../input';

const sections = sectionAssignmentPairs
  .split('\n')
  .map(
    s => s
      .split(',')
      .map(s => s.split('-').map(n => parseInt(n)))
  );

let count = 0;
sections.forEach(s => {
  const [as, ae] = s[0];
  const [bs, be] = s[1];

  if (
    as === bs
    || as === be
    || ae === bs
    || ae === be
    || (ae >= bs && ae <= be)
    || (bs >= as && bs <= ae)
    || (as >= bs && as <= be)
    || (be >= as && be <= ae)
  ) count ++;
});

console.log('In how many assignment pairs do the ranges overlap?', count);

// answer 956
// example answer 4
