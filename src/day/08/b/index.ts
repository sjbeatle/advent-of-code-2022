import { reverse } from 'lodash';
import { input as forest} from '../input';

const grid = forest.split('\n').map(row => row.split('').map(t => parseInt(t)));

class Tree {
  height: number;

  north: number[] = [];
  south: number[] = [];
  east: number[] = [];
  west: number[] = [];

  constructor(height:number) {
    this.height = height;
  }

  get scenicScore() {
    const { north, south, east, west } = this;

    return [
      this.findScore(this.height, reverse([...north])),
      this.findScore(this.height, south),
      this.findScore(this.height, east),
      this.findScore(this.height, reverse([...west])),
    ].reduce((p, c) => p * c, 1);
  }

  findScore(height: number, trees: number[]) {
    let score = 0;

    trees.some((t) => {
      score++;
      if (t >= height) return true;
    });

    return !trees.length ? 0 : score || 1;
  }
}

class Forest {
  forest: number[][]
  trees: Map<string, Tree> = new Map;

  constructor(forest: number[][]) {
    this.forest = forest;
    forest.forEach((row, y) => {
      row.forEach((col, x) => {
        this.trees.set(`${x},${y}`, new Tree(col));
      });
    });

    this.generateNeighbors();
  }

  generateNeighbors() {
    this.forest.forEach((row, y) => {
      row.forEach((_col, x) => {
        const tree = this.trees.get(`${x},${y}`);
        const westerlyTree = this.trees.get(`${x-1},${y}`);
        const northerlyTree = this.trees.get(`${x},${y-1}`);
        if (westerlyTree) tree.west = [...westerlyTree.west, westerlyTree.height];
        if (northerlyTree) tree.north = [...northerlyTree.north, northerlyTree.height];
      });
    });

    for (let y = this.forest.length - 1; y >= 0 ; y--) {
      for (let x = this.forest[0].length - 1; x >= 0 ; x--) {
        const tree = this.trees.get(`${x},${y}`);
        const easterlyTree = this.trees.get(`${x+1},${y}`);
        const southerlyTree = this.trees.get(`${x},${y+1}`);
        if (easterlyTree) tree.east = [easterlyTree.height, ...easterlyTree.east];
        if (southerlyTree) tree.south = [southerlyTree.height, ...southerlyTree.south];
      }
    }
  }
}

const myForest = new Forest(grid);

const scores: number[] = [];
myForest.trees.forEach(t => scores.push(t.scenicScore));
console.log('What is the highest scenic score possible for any tree?', Math.max(...scores));

// answer 263670
// example answer 8
