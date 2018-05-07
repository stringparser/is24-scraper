export declare type ResultListItem = {
    id: string;
    url: string;
    availableFrom: string;
};
export declare type ResultList = {
    items: Partial<ResultListItem>[];
    paging: {
        next: string;
        previous: string;
        pageSize: number;
        pageNumber: number;
        numberOfPages: number;
    };
};
