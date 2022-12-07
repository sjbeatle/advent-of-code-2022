import { input as datastreamBuffer} from '../input';
import { uniq } from 'lodash';

let isMarker = false;
let i = 0;
while (!isMarker) {
  isMarker = uniq(datastreamBuffer.substring(i, i+4).split('')).length === 4;
  i++;
}

console.log('How many characters need to be processed before the first start-of-packet marker is detected?', i + 3);

// answer 1042
// example answer 7
