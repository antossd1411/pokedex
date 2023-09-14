export default class Pokemons {
    constructor({
        abilities = [],
        base_experience = 0,
        height = 0,
        id = 0,
        is_default = false,
        moves = [],
        name = "",
        order = 0,
        sprites = [],
        stats = [],
        types = [],
        weight = 0,
    }) {
        this.abilities = abilities;
        this.base_experience = base_experience;
        this.height = height;
        this.id = id;
        this.is_default = is_default;
        this.moves = moves;
        this.name = name;
        this.order = order;
        this.sprites = sprites;
        this.stats = stats;
        this.types = types;
        this.weight = weight;
    }
}