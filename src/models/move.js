export default class Move extends Element {
    accuracy;
    power;
    pp;
    priority;
    type;

    constructor({
        id = 0,
        name = "",
        accuracy = 0,
        power = 0,
        pp = 0,
        priority = 0,
        type = null,
    }) {
        super({ id: id, name: name });

        this.accuracy = accuracy;
        this.power = power;
        this.pp = pp;
        this.priority = priority;
        this.type = type;
    }
}