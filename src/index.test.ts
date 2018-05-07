import API from './index';
import { defaultSearch, appartmentSearchURL } from './constants';


describe('is24-scraper', () => {
  jest.setTimeout(30E+3);

  const options = {
    itemsPerPage: 1
  };

  it('should get only options.itemsPerPage', async () => {
    const { items } = await API(defaultSearch, options);
    expect(items).toHaveLength(options.itemsPerPage);
  });

  it('should have pagination', async () => {
    const { paging } = await API(defaultSearch, options);
    expect(paging.next).toBeDefined();
    expect(paging.next).toContain(appartmentSearchURL);
    expect(paging.previous).toBeDefined();
  });
});
