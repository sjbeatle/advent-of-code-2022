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
const columnCount = reverseStacks[0].length;

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
  reverseStacks.push(new Array(columnCount).fill('.'));
}

instructions.forEach(i => {
  const { count, from, to } = i;
  for (let index = 0; index < count; index++) {
    const { crate, row } = findTopCrate(from);
    const vacantRow = findVacancy(to);
    if (vacantRow > reverseStacks.length - 1) { addRow(); }
    reverseStacks[row][from-1] = '.';
    reverseStacks[vacantRow][to-1] = crate;
  }
});

const topCrates = [];
for (let i = 1; i < columnCount + 1; i++) {
  topCrates.push(findTopCrate(i).crate);
}

console.log('After the rearrangement procedure completes, what crate ends up on top of each stack?', topCrates.reduce((p, c) => `${p}${c}`, ''));

// answer VQZNJMWTR
// example answer CMZ
