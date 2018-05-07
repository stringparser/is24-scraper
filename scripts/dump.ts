
import fs from 'fs';
import API from '../src';
import { defaultSearch } from '../src/constants';

const stream = fs.createWriteStream('dump.md');

stream.write('availableFrom | url \n');
stream.write('----|-------------- \n');

(async function whilst(url = defaultSearch) {
  const result = await API(url);

  result.items.map(el => {
    stream.write(
      `${el.availableFrom || 'sofort'} | ${el.url}\n`
    );
  });

  if (result.paging.next) {
    whilst(result.paging.next);
  }
})();
