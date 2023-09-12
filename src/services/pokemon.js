import QueryFilters from "@/models/query-filters"

export const fetchPokemon = async (queryFilters = new QueryFilters({})) => {
    return fetch(process.env.POKEAPI_URL + "/pokemon?" + new URLSearchParams({ ...queryFilters }));
}