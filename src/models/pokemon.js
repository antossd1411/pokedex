export default class Pokemons extends Element {
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
    frontSprite;
    backSprite;

    constructor({
        id = 0,
        name = "",
        abilities = [],
        base_experience = 0,
        height = 0,
        is_default = false,
        moves = [],
        order = 0,
        sprites = [],
        stats = [],
        types = [],
        weight = 0,
        frontSprite = "",
        backSprite = "",
    }) {
        super({ id: id, name: name });

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
        this.frontSprite = frontSprite;
        this.backSprite = backSprite;
    }
}