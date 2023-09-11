import QueryFilters from "@/models/query-filters"

export const fetchPokemon = async (queryFilters = new QueryFilters({})) => {
    return fetch("https://pokeapi.co/api/v2/pokemon?" + new URLSearchParams({ ...queryFilters }));
}