// utils/buildPaginationPayload.js

export const buildPaginationPayload = ({
    page = 1,
    limit = 2,
    search = "",
    filters = {},
    sort = {
        field: "createdAt",
        order: "desc",
    },
}) => ({
    pagination: {
        page,
        limit,
    },
    search,
    filters,
    sort,
});