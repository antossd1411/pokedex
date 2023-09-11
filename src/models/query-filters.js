export default class QueryFilters {
    constructor({
        offset = 0,
        limit = 10
    }) {
        this.offset = offset;
        this.limit = limit;
    }
}