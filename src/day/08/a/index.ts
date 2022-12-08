import { input as forest} from '../input';

const grid = forest.split('\n').map(row => row.split('').map(t => parseInt(t)));

class Tree {
  height: number;
  isEdge: boolean;

  north: number[] = [];
  south: number[] = [];
  east: number[] = [];
  west: number[] = [];

  constructor(height:number, isEdge:boolean) {
    this.height = height;
    this.isEdge = isEdge;
  }

  get isVisible() {
    return this.isEdge
      || this.height > Math.max(...this.north)
      || this.height > Math.max(...this.south)
      || this.height > Math.max(...this.east)
      || this.height > Math.max(...this.west);
  }
}

class Forest {
  forest: number[][]
  trees: Map<string, Tree> = new Map;

  constructor(forest: number[][]) {
    this.forest = forest;
    forest.forEach((row, y) => {
      row.forEach((col, x) => {
        const isEdge = y === 0 || (y === forest.length - 1) || x === 0 || (x === row.length -1);
        this.trees.set(`${x},${y}`, new Tree(col, isEdge));
      });
    });

    this.generateNeighbors();
  }

  get visibleCount() {
    let count = 0;
    this.trees.forEach((tree) => {
      if (tree.isVisible) count++;
    });
    return count;
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

console.log('How many trees are visible from outside the grid?', myForest.visibleCount);

// answer
// example answer
