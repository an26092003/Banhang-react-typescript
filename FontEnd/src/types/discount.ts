 export interface Discount {
      _id : number | string,
      code: string;
      discount: number;
      count: number;
      startDate: Date;
      endDate: Date;
    }
    export interface PaginatedDiscount {
      docs: Discount[];
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
      nextPage: null;
      page: number;
      pagingCounter: number;
      prevPage: null;
      totalDocs: number;
      totalPages: number;
  }