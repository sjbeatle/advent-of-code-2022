import { input as motions} from '../input';

const steps = motions.split('\n').map(s => ({
  direction: s.split(' ')[0],
  distance: parseInt(s.split(' ')[1]),
}));

let POSH = {
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

function moveT() {
  const xH = POSH.x;
  const yH = POSH.y;
  const xT = POST.x;
  const yT = POST.y;

  const deltaX = xH - xT;
  const newX = deltaX > 0 ? xT + 1 : xT - 1;
  const deltaY = yH - yT;
  const newY = deltaY > 0 ? yT + 1 : yT - 1;

  // if still touching, do nothing
  if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1) return;

  if (deltaY === 0) { // horizontal move
    setPOST(newX, yT);
    return;
  }

  if (deltaX === 0) { // vertical move
    setPOST(xT, newY);
    return
  }

  // diagonal move
  setPOST(newX, newY);
}

function setPOST(x:number, y:number) {
  POST.x = x;
  POST.y = y;
  VISITED.add(`${x},${y}`)
}

function makeMove(dir: string) {
  moveH(dir);
  moveT();
}

steps.forEach(s => {
  const { direction, distance } = s;

  for (let i = 0; i < distance; i++) {
    makeMove(direction);
  }
});

console.log('How many positions does the tail of the rope visit at least once?', VISITED.size);

// answer 6256
// example answer 13
