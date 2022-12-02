import { input as strategyGuide} from '../input';

enum Points {
  'ROCK' = 1,
  'PAPER' = 2,
  'SCISSORS' = 3,
}

enum Scoring {
  'LOSE' = 0,
  'DRAW' = 3,
  'WIN' = 6,
}

enum OpponentPlay {
  'A' = 'ROCK',
  'B' = 'PAPER',
  'C' = 'SCISSORS',
}

enum PlayerPlay {
  'X' = 'ROCK',
  'Y' = 'PAPER',
  'Z' = 'SCISSORS',
}

type Opponent = 'A' | 'B' | 'C';
type Player = 'X' | 'Y' | 'Z';

interface IGame {
  opponent: Opponent,
  player: Player,
}

const games = strategyGuide.split('\n').map(row => {
  const [opponent, player] = row.split(' ');
  return {
    opponent,
    player,
  } as IGame;
});

function rockPaperScissors({
  opponent,
  player,
}: IGame): number {
  let points = Points[PlayerPlay[player]];
  return points + outcome(opponent, player);
}

function outcome(o: Opponent, p: Player): number {
  // @ts-ignore
  if (PlayerPlay[p] === OpponentPlay[o])
    return Scoring.DRAW;

  switch (p) {
    case 'X': // Rock
      return OpponentPlay[o] === 'PAPER' ? Scoring.LOSE : Scoring.WIN;

    case 'Y': // Paper
      return OpponentPlay[o] === 'SCISSORS' ? Scoring.LOSE : Scoring.WIN;

    case 'Z': // Scissors
    return OpponentPlay[o] === 'ROCK' ? Scoring.LOSE : Scoring.WIN;
  }
}

const total = games.reduce((p, c) => p + rockPaperScissors(c), 0);

console.log('What would your total score be if everything goes exactly according to your strategy guide?', total);

// answer 12156
// example answer 12
