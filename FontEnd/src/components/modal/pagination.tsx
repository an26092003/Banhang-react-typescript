interface PaginationOptions {
    currentPage: number;
    perPage: number;
    totalCount: number;
    data: any[];
}

export function calculatePagination(options: PaginationOptions) {
    const { currentPage, perPage, totalCount } = options;
    const pageCount = Math.ceil(totalCount / perPage);
    const offset = currentPage * perPage;

    return {
        pageCount,
        offset,
        currentPageItems: options.data.slice(offset, offset + perPage),
    };
}
