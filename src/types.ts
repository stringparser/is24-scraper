
export type ResultListItem = {
  id: string;
  url: string;
  availableFrom: string;
};

export type ResultList = {
  items: Partial<ResultListItem>[];
  paging: {
    next: string;
    previous: string;
    pageSize: number;
    pageNumber: number;
    numberOfPages: number;
  };
};
