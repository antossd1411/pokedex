export const fetchMove = (id = "") => {
    return fetch(`${process.env.POKEAPI_URL}/move/${id}`);
}