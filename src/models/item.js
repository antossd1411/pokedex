import ElementModel from "./element";

export default class Items extends ElementModel {
    attributes;
    category;
    cost;
    effect_entries;
    sprites;

    constructor({
        id = 0,
        name = "",
        attributes = [],
        category = null,
        cost = 0,
        effect_entries = [],
        sprites = null,
    }) {
        super( id, name );

        this.attributes = attributes;
        this.category = category;
        this.cost = cost;
        this.effect_entries = effect_entries;
        this.sprites = sprites;
    }
}