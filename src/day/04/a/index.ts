import { includes } from 'lodash';
import { input as sectionAssignmentPairs} from '../input';

function makeList(input: string[]) {
  const list = [];
  const start = parseInt(input[0]);
  const finish = parseInt(input[1]);
  let count = start;
  while (count <= finish) {
    list.push(count);
    count = count + 1;
  }
  return `(${list.join(')(')})`;
}

const sections = sectionAssignmentPairs
  .split('\n')
  .map(
    s => s
      .split(',')
      .map(s => makeList(s.split('-')))
  );

let count = 0;
sections.forEach(s => {
  const lista = s[0];
  const listb = s[1];
  if (includes(lista, listb) || includes(listb, lista)) count++;
});

console.log('In how many assignment pairs does one range fully contain the other?', count);

// answer 651
// example answer 2
