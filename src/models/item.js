export default class Item extends Element {
    attributes;
    category;
    cost;

    constructor({
        id = 0,
        name = "",
        attributes = [],
        category = null,
        cost = 0,
    }) {
        super({ id: id, name: name });

        this.attributes = attributes;
        this.category = category;
        this.cost = cost;
    }
}