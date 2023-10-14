export const fetchPokemon = (id = "") => {
    return fetch(`${process.env.POKEAPI_URL}/pokemon/${id}`);
}