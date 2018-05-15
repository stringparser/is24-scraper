
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
  coldRent: number;
  totalRent: number;
  bathRooms: string;
  description: string;
  livingSpace: number;
  heatingType: string;
  utilityCosts: number;
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
