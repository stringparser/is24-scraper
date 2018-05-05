import API from './index';
import { appartmentSearchURL } from './constants';

const defaultSearch = 'https://www.immobilienscout24.de/Suche/S-2/Wohnung-Miete/Berlin/Berlin/Friedrichshain-Friedrichshain_Kreuzberg-Kreuzberg_Neukoelln-Neukoelln_Treptow-Treptow/3,00-/-/EURO--2000,00/-/-/-/-/-/true/-/-/true/-/-/-/-/-/-/-/16000';

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
