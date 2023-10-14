export const fetchType = (id = "") => {
    return fetch(`${process.env.POKEAPI_URL}/type/${id}`);
}