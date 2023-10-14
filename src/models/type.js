import ElementModel from "./element";

export default class Types extends ElementModel {
    damage_relations;
    move_damage_class;
    moves;
    pokemon;

    constructor({
        id = 0,
        name = "",
        damage_relations = {},
        move_damage_class = {},
        moves = [],
        pokemon = [],
    }) {
        super(id, name);

        this.damage_relations = damage_relations;
        this.move_damage_class = move_damage_class;
        this.moves = moves;
        this.pokemon = pokemon;
    }
}