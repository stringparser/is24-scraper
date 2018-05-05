import { ResultList } from './types';
declare function is24ListScraper(listURL: string, options?: {
    itemsPerPage: number;
}): Promise<ResultList>;
export default is24ListScraper;
