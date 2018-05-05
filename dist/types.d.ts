export declare type ResultListItem = {
    id: string;
    url: string;
};
export declare type ResultList = {
    items: Partial<ResultListItem>[];
    paging: {
        next: string;
        previous: string;
    };
};
