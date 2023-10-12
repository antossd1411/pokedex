import QueryFilters from "@/models/query-filters"

const fetchElements = async (uriSegment = "", queryFilters = new QueryFilters({})) => {
    return fetch(`${process.env.POKEAPI_URL}/${uriSegment}?${new URLSearchParams({ ...queryFilters })}`);
}

export {
    fetchElements,
};