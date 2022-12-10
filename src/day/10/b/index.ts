import { input as program } from '../input';

const image: string[][] = [];
image.push(Array(40).fill('.'));
image.push(Array(40).fill('.'));
image.push(Array(40).fill('.'));
image.push(Array(40).fill('.'));
image.push(Array(40).fill('.'));
image.push(Array(40).fill('.'));
let cycle = 0;
let X = 0;
let row = 0;
let sprite = [0,1,2];

const commands = program.split('\n').map(c => ({
  op: c.split(' ')[0],
  num: parseInt(c.split(' ')[1])
}));

commands.forEach((c) => {
  image[row][cycle % 40] = sprite.includes(cycle % 40) ? '#' : '.';
  increaseCycle();

  if (c.op !== 'noop') {
    image[row][cycle % 40] = sprite.includes(cycle % 40) ? '#' : '.';
    increaseCycle();
    X = X + c.num;
    sprite = [X, X + 1, X + 2];
  }
});

function increaseCycle(i?: number) {
  cycle = cycle + 1;
  if (cycle % 40 === 0) row++;
}

console.log('What eight capital letters appear on your CRT?', '\n' + image.map(l => l.join('')).join('\n'));

// answer
// example answer
