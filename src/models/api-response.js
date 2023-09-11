export default class ApiResponse {
    constructor({
        count = 0,
        previous = '',
        next = '',
        results = []
    }) {
        this.count = count;
        this.previous = previous;
        this.next = next;
        this.results = results;
    }
}