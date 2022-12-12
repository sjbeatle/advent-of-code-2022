import { isNaN } from 'lodash';
import { example as notes} from '../input';

const notesByMonkey = notes.split('\n\n');

class Monkey {
  items: number[];
  operation: any[];
  testDividend: number;
  testTrueMonkey: number;
  testFalseMonkey: number;
  inspectionCount = 0;

  constructor(input: string) {
    const inputByLine = input.split('\n');
    this.items = inputByLine[1].split(': ')[1].split(', ').map(i => parseInt(i));
    this.operation = inputByLine[2].split('= ')[1].split(' ').map(i => {
      const parsed = parseInt(i);
      return isNaN(parsed) ? i : parsed;
    });
    this.testDividend = parseInt(inputByLine[3].split(' ').pop());
    this.testTrueMonkey = parseInt(inputByLine[4].split(' ').pop());
    this.testFalseMonkey = parseInt(inputByLine[5].split(' ').pop());
  }

  startRound() {
    this.items = this.items.map(i => {
      this.inspectionCount++;
      return this.runOperation(i);
    });
  }

  runOperation(level: number) {
    const [left, op, right] = this.operation;
    const newLeft = left === 'old' ? level : left;
    const newRight = right === 'old' ? level : right;
    return op === '+'
      ? newLeft + newRight
      : newLeft * newRight;
  }

  runTest(level: number) {
    return level % this.testDividend === 0;
  }

  getNewMonkey(level: number) {
    return this.runTest(level) ? this.testTrueMonkey : this.testFalseMonkey;
  }

  endRound() {
    this.items = [];
  }
}

class Monkeys {
  monkeys: Monkey[] = [];

  constructor(input: string[]) {
    input.forEach(m => this.monkeys.push(new Monkey(m)));
  }

  playRound() {
    this.monkeys.forEach(monkey => {
      monkey.startRound();
      monkey.items.forEach(item => {
        const monkeyIndex = monkey.getNewMonkey(item);
        this.monkeys[monkeyIndex].items.push(item);
      });
      monkey.endRound();
    });
  }

  playRounds(count: number) {
    for (let i = 0; i < count; i++) {
      this.playRound();
    }
  }

  get monkeyBusinessLevel() {
    const activity = this.monkeys.map(monkey => monkey.inspectionCount).sort((a, b) => b - a);
    console.log('>> TESTING >> activity', activity);
    return activity[0] * activity[1];
  }
}

const monkeys = new Monkeys(notesByMonkey);
monkeys.playRounds(20);


console.log('What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?', monkeys.monkeyBusinessLevel);

// answer 14490137489 (too low)
// example answer 2713310158
