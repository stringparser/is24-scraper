
export type ResultListItem = {
  id: string;
  url: string;
};

export type ResultList = {
  items: Partial<ResultListItem>[];
  paging: {
    next: string;
    previous: string;
  };
};
