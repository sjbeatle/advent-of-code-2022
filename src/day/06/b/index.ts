import { input as datastreamBuffer} from '../input';
import { uniq } from 'lodash';

let isMarker = false;
let i = 0;
while (!isMarker) {
  isMarker = uniq(datastreamBuffer.substring(i, i+14).split('')).length === 14;
  i++;
}

console.log('How many characters need to be processed before the first start-of-packet marker is detected?', i + 13);

// answer 2980
// example answer 19
