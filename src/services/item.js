const fetchItem = (segment = "", itemId = 0) => {
    return fetch(`${process.env.POKEAPI_URL}/${segment}/${itemId}`);
}

export {
    fetchItem
}