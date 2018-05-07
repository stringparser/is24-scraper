
import fs from 'fs';
import API from '../src';
import { defaultSearch } from '../src/constants';

(async function() {
  const stream = fs.createWriteStream('dump.json');
  const result = await API(defaultSearch);

  stream.write(JSON.stringify(result, null, 2));
})();
