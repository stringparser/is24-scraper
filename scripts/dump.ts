
import fs from 'fs';
import API from '../src';
import { defaultSearch } from '../src/constants';
import { ResultListItem } from '../src/types';

const stream = {
  md: fs.createWriteStream('dump.md'),
  json: fs.createWriteStream('dump.json')
};

const results: Partial<ResultListItem>[] = [];

stream.md.write('availableFrom | url \n');
stream.md.write('----|-------------- \n');

(async function whilst(url = defaultSearch) {
  const result = await API(url);

  result.items.forEach(el => {
    stream.md.write(
      `${el.availableFrom || 'sofort'} | ${el.url}\n`
    );
    results.push(el);
  });

  if (result.paging.next) {
    whilst(result.paging.next);
  } else {
    stream.json.write(JSON.stringify(results, null, 2));
  }
})();
