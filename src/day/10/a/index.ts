import { input as program } from '../input';

const commands = program.split('\n').map(l => ({
  op: l.split(' ')[0],
  num: parseInt(l.split(' ')[1])
}));

const CHECK = [20, 60, 100, 140, 180, 220];
const signalStrength: number[] = [];
let cycle = 0;
let X = 1;
commands.forEach(l => {
  if(l.op === 'noop') {
    increaseCycle();
    if (CHECK.includes(cycle)) pushSignalStrength(X);
  } else {
    increaseCycle();
    if (CHECK.includes(cycle)) pushSignalStrength(X);
    increaseCycle();
    if (CHECK.includes(cycle)) pushSignalStrength(X);
    X = X + l.num;
  }
});

function increaseCycle() { cycle = cycle + 1; };
function pushSignalStrength(val:number) {
  signalStrength.push(val * cycle);
}

console.log('What is the sum of these six signal strengths?', signalStrength.reduce((p, c) => p + c, 0));

// answer 13480
// example answer 13140
