import ElementModel from "./element";

export default class Moves extends ElementModel {
    accuracy;
    damage_class;
    learned_by_pokemon;
    power;
    pp;
    priority;
    type;

    constructor({
        id = 0,
        name = "",
        accuracy = 0,
        damage_class = null,
        learned_by_pokemon = [],
        power = 0,
        pp = 0,
        priority = 0,
        type = null,
    }) {
        super(id, name);

        this.accuracy = accuracy;
        this.damage_class = damage_class;
        this.learned_by_pokemon = learned_by_pokemon;
        this.power = power;
        this.pp = pp;
        this.priority = priority;
        this.type = type;
    }
}