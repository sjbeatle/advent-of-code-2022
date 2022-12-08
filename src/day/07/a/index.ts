import { get, isPlainObject } from 'lodash';
import { input as terminalOutput} from '../input';

const MAX = 100000;

const lines = terminalOutput.split('\n');
lines.shift();

const structure: any = { files: [] };
const cursor: string[] = [];

function getStructure() { return (get(structure, cursor.join('.')) || structure) };

function handleCommand(input: string[]) {
  const command = input[0];
  if (command === 'ls') return;

  if (command === 'cd') {
    const directory = input[1];
    if (directory === '..') {
      // const s = getStructure();
      // const totalSize = s.files.reduce((p: number, c: number) => p + c, 0);
      // s.totalSize = totalSize;
      cursor.pop();
      // getStructure().files.push(totalSize);
    } else {
      directory.split('/').forEach((d: string) => cursor.push(d));
    }
  }
}

lines.forEach(l => {
  const input = l.split(' ');

  switch (input[0]) {
    case 'dir':
      getStructure()[input[1]] = { files: [] };
      break;

    case '$':
      input.shift();
      handleCommand(input);
      break;

    default:
      getStructure().files.push(parseInt(input[0]));
  }
});


const traverseStructure = (struct: any, parent?: any) => {
  const keys = Object.keys(struct);

  const totals: number[] = [struct.files.reduce((p: number, c: number) => p + c, 0)];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key !== 'files') {
      totals.push(traverseStructure(struct[key], struct));
    }
  }

  if (parent) parent.files.push(totals.reduce((p: number, c: number) => p + c, 0));
  return totals.reduce((p: number, c: number) => p + c, 0);
};

traverseStructure(structure);

const atMost: number[] = [];
const getAtMost = (struct: any) => {
  const keys = Object.keys(struct);

  const totalSize = struct.files.reduce((p: number, c: number) => p + c, 0);

  if (totalSize <= MAX) atMost.push(totalSize);

  for (let i = 0; i < keys.length; i++) {
    if (isPlainObject(struct[keys[i]])) {
      getAtMost(struct[keys[i]]);
    }
  }
};

getAtMost(structure);

console.log('What is the sum of the total sizes of those directories?', atMost.reduce((p, c) => p + c, 0));

// answer 1648397
// example answer 95437
