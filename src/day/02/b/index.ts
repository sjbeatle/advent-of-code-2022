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

enum Play {
  'A' = 'ROCK',
  'B' = 'PAPER',
  'C' = 'SCISSORS',
}

enum PlayerPlay {
  'X' = 'LOSE',
  'Y' = 'DRAW',
  'Z' = 'WIN',
}

type Opponent = 'A' | 'B' | 'C';
type Player = 'X' | 'Y' | 'Z';

interface IGame {
  opponent: Play,
  player: Play,
}

const games = strategyGuide.split('\n').map(row => {
  const [opponent, player] = row.split(' ');
  return {
    opponent: Play[opponent as Opponent],
    player: decidePlay(opponent as Opponent, player as Player),
  } as IGame;
});

function rockPaperScissors({
  opponent,
  player,
}: IGame): number {
  let points = Points[player];
  return points + outcome(opponent, player);
}

function outcome(o: Play, p: Play): number {
  if (p === o)
    return Scoring.DRAW;

  switch (p) {
    case Play.A: // Rock
      return o === Play.B ? Scoring.LOSE : Scoring.WIN;

    case Play.B: // Paper
      return o === Play.C ? Scoring.LOSE : Scoring.WIN;

    case Play.C: // Scissors
    return o === Play.A ? Scoring.LOSE : Scoring.WIN;
  }
}

function decidePlay(o: Opponent, p: Player): Play {
  switch (PlayerPlay[p]) {
    case PlayerPlay.X: // lose
      if(Play[o] === 'ROCK')
        return Play.C;
      if(Play[o] === 'SCISSORS')
        return Play.B;
      if(Play[o] === 'PAPER')
        return Play.A;

    case PlayerPlay.Z: // win
      if(Play[o] === 'ROCK')
        return Play.B;
      if(Play[o] === 'SCISSORS')
        return Play.A;
      if(Play[o] === 'PAPER')
        return Play.C;

    case PlayerPlay.Y: //draw
      return Play[o];
  }
}

const total = games.reduce((p, c) => p + rockPaperScissors(c), 0);

console.log('What would your total score be if everything goes exactly according to your strategy guide?', total);

// answer 10835
// example answer 12
