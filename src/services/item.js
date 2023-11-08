export const fetchItem = (id = "") => {
    return fetch(`${process.env.POKEAPI_URL}/item/${id}`);
}