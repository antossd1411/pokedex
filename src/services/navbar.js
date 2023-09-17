const fetchNavItems = async () => {
    return fetch("https://pokeapi.co/api/v2");
}

export {
    fetchNavItems,
}