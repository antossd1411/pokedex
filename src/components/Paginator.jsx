import style from '@/styles/components/Paginator.module.css';

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
        const newOffset = offset + limit;
        if (newOffset > count) {
            onPagination();
        } else {
            onPagination(newOffset);
        }
    }

    return (
        <div className="">
            <span className={`${style.buttonContainer}`}>
                <button type="button" className={`${style.paginatorButton}`} onClick={() => onPagination(0)}>SI</button>
                <button type="button" className={`${style.paginatorButton}`} onClick={() => getPrevious()}>I</button>
                <span className={`${style.paginatorInfo}`}>Showing { offset + 1 } to { offset + limit } of { count }</span>
                <button type="button" className={`${style.paginatorButton}`}  onClick={() => getNext()}>D</button>
                <button type="button" className={`${style.paginatorButton}`}  onClick={() => onPagination(count - limit)}>SD</button>
            </span>

            <select className={style.rowsSelect} name="rows" id="rows" value={limit} onChange={(e) => onRowsChange(e.target)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}