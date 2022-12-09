import { input as motions} from '../input';

const steps = motions.split('\n').map(s => ({
  direction: s.split(' ')[0],
  distance: parseInt(s.split(' ')[1]),
}));

let POSH = {
  x: 0,
  y: 0,
};
let POSH1 = {
  x: 0,
  y: 0,
};
let POSH2 = {
  x: 0,
  y: 0,
};
let POSH3 = {
  x: 0,
  y: 0,
};
let POSH4 = {
  x: 0,
  y: 0,
};
let POSH5 = {
  x: 0,
  y: 0,
};
let POSH6 = {
  x: 0,
  y: 0,
};
let POSH7 = {
  x: 0,
  y: 0,
};
let POSH8 = {
  x: 0,
  y: 0,
};
let POST = {
  x: 0,
  y: 0,
};
function getPos(pos: string) {
  return {
    x: parseInt(pos.split(' ')[0]),
    y: parseInt(pos.split(' ')[1]),
  };
};
const VISITED = new Set<string>([`0,0`]);

function moveH(dir: string) {
  switch (dir) {
    case 'R':
      POSH.x++;
      break;

    case 'L':
      POSH.x--;
      break;

    case 'U':
      POSH.y++;
      break;

    case 'D':
      POSH.y--;
      break;
  }
}

function move(leader: { x:number, y:number}, knot: { x:number, y:number}, isTail?: boolean) {
  const xH = leader.x;
  const yH = leader.y;
  const xT = knot.x;
  const yT = knot.y;

  const deltaX = xH - xT;
  const newX = deltaX > 0 ? xT + 1 : xT - 1;
  const deltaY = yH - yT;
  const newY = deltaY > 0 ? yT + 1 : yT - 1;

  // if still touching, do nothing
  if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1) return;

  if (deltaY === 0) { // horizontal move
    setKnot(newX, yT, knot, isTail);
    return;
  }

  if (deltaX === 0) { // vertical move
    setKnot(xT, newY, knot, isTail);
    return
  }

  // diagonal move
  setKnot(newX, newY, knot, isTail);
}

function setKnot(x:number, y:number, knot: { x:number, y:number}, isTail?: boolean) {
  knot.x = x;
  knot.y = y;
  if (isTail) VISITED.add(`${x},${y}`);
}

function makeMove(dir: string) {
  moveH(dir);
  move(POSH, POSH1);
  move(POSH1, POSH2);
  move(POSH2, POSH3);
  move(POSH3, POSH4);
  move(POSH4, POSH5);
  move(POSH5, POSH6);
  move(POSH6, POSH7);
  move(POSH7, POSH8);
  move(POSH8, POST, true);
}

steps.forEach(s => {
  const { direction, distance } = s;

  for (let i = 0; i < distance; i++) {
    makeMove(direction);
  }
});

console.log('How many positions does the tail of the rope visit at least once?', VISITED.size);

// answer
// example answer
