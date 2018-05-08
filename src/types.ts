
export type ResultListItem = {
  url: string;
  type: string;
  tags: string[];
  title: string;
  floor: string;
  rooms: string;
  images: string[];
  private: boolean;
  deposit: string;
  address: string;
  coldRent: string;
  totalRent: string;
  bathRooms: string;
  description: string;
  livingSpace: string;
  heatingType: string;
  utilityCosts: string;
  heatingCosts: string;
  aparmentState: string;
  availableFrom: string;
  amenitiesQuality: string;
  mainEnergySourceType: string;
};

export type ResultList = {
  items: ResultListItem[];
  paging: {
    next: string;
    previous: string;
    pageSize: number;
    pageNumber: number;
    numberOfPages: number;
  };
};
