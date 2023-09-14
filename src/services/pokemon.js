import QueryFilters from "@/models/query-filters"

const fetchPokemon = async (queryFilters = new QueryFilters({})) => {
    return fetch(process.env.POKEAPI_URL + "/pokemon?" + new URLSearchParams({ ...queryFilters }));
}

const fetchPokemonByName = async (name = "") => {
    return fetch(`${process.env.POKEAPI_URL}/pokemon/${name}`);
}

export {
    fetchPokemon,
    fetchPokemonByName,
};