import ElementModel from "./element";

export default class Pokemons extends ElementModel {
    abilities;
    base_experience;
    height;
    is_default;
    moves;
    order;
    sprites;
    stats;
    types;
    weight;

    constructor({
        id = 0,
        name = "",
        abilities = [],
        base_experience = 0,
        height = 0,
        is_default = false,
        moves = [],
        order = 0,
        sprites = {},
        stats = [],
        types = [],
        weight = 0,
    }) {
        super( id, name );

        this.abilities = abilities;
        this.base_experience = base_experience;
        this.height = height;
        this.is_default = is_default;
        this.moves = moves;
        this.order = order;
        this.sprites = sprites;
        this.stats = stats;
        this.types = types;
        this.weight = weight;
    }
}