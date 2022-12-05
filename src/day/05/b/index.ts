import { reverse, cloneDeep } from 'lodash';
import {
  inputProcedure as procedure,
  inputStacks as stacks,
} from '../input';

const instructions = procedure.split('\n').map(p => {
    const line = p.replaceAll('move ', '');
    const [count, move] = line.split(' from ');
    const [from, to] = move.split(' to ');
    return {
      count: parseInt(count),
      from: parseInt(from),
      to: parseInt(to),
    };
  });

const reverseStacks = reverse(cloneDeep(stacks));
const columns = reverseStacks[0].length;

function findTopCrates(col: number, count: number) {
  let { crate, row} = findTopCrate(col);
  const crates = [crate];

  for (let i = 1; i < count; i++) {
    crates.unshift(reverseStacks[row - i][col - 1]);
  }

  return {
    crates,
    row
  };
}

function findTopCrate(col: number) {
  let crate = '.';
  for (let row = reverseStacks.length - 1; row >= -1; row--) {
    crate = reverseStacks[row][col-1];
    if (reverseStacks[row][col-1] !== '.') {
      return {
        crate,
        row
      };
    }
  }
}

function findVacancy(col: number) {
  for (let row = reverseStacks.length - 1; row >= -1; row--) {
    if (row < 0) return 0;
    if (reverseStacks[row][col - 1] !== '.') return row + 1;
  }
}

function addRow() {
  reverseStacks.push(new Array(columns).fill('.'));
}

instructions.forEach(i => {
  const { count, from, to } = i;
  const { crates, row } = findTopCrates(from, count);
  for (let index = 0; index < count; index++) {
    const vacantRow = findVacancy(to);
    if (vacantRow > reverseStacks.length - 1) { addRow(); }
    reverseStacks[row - index][from-1] = '.';
    reverseStacks[vacantRow][to-1] = crates[index];
  }
});

const topCrates = [];
for (let i = 1; i < columns + 1; i++) {
  topCrates.push(findTopCrate(i).crate);
}

console.log('After the rearrangement procedure completes, what crate ends up on top of each stack?', topCrates.reduce((p, c) => `${p}${c}`, ''));

// answer NLCDCLVMQ
// example answer MCD
