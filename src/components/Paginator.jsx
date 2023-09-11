export default function Paginator({
    count = 1, // Total rows
    limit = 0,
    offset = 0,
    onPagination,
    onRowsChange,
}) {

    const getPrevious = () => {
        const newOffset = offset - limit;
        if (newOffset < 0) {
            onPagination();
        } else {
            onPagination(newOffset);
        }
    }

    const getNext = () => {

    }

    const currentPage = Math.ceil(offset / limit) + 1;

    const maxPage = Math.ceil(count / limit);

    return (
        <div className="">
            <span>
                <button type="button" onClick={() => onPagination(0)}>SI</button>
                <button type="button" onClick={() => getPrevious()}>I</button>
                <span>Page { currentPage } of { maxPage }</span>
                <button type="button"  onClick={() => onPagination(offset + limit)}>D</button>
                {/* <button type="button"  onClick={() => onPagination(maxPage)}>SD</button> */}
            </span>

            <select name="rows" id="rows" value={limit} onChange={(e) => onRowsChange(e.target)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}