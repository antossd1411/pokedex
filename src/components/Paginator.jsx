import style from '@/styles/components/Paginator.module.css';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Paginator({
    count = 1, // Total rows
    limit = 10,
    firstRow = 0,
    onPagination,
    onRowsChange,
}) {

    const getPrevious = (firstRow = 0) => {
        if (firstRow < 0) {
            onPagination();
        } else {
            onPagination(firstRow);
        }
    }

    const getNext = (firstRow = 0) => {
        onPagination(firstRow);
    }
    
    const lastPage = Math.ceil(count / limit);

    let lastRow = (firstRow + limit) >= count ? count : (firstRow + limit);
    
    return (
        <div className="">
            <span className={`${style.buttonContainer}`}>
                <button type="button" disabled={count === 0 || firstRow === 0} className={`${style.paginatorButton}`} onClick={() => onPagination()}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </button>
                <button type="button" disabled={count === 0 || firstRow === 0} className={`${style.paginatorButton}`} onClick={() => getPrevious(firstRow - limit)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                <span className={`${style.paginatorInfo}`}>{firstRow + 1} - {lastRow} of { count }</span>

                <button type="button" disabled={count === 0 || lastRow >= count} className={`${style.paginatorButton}`}  onClick={() => getNext(firstRow + limit)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <button type="button" disabled={count === 0 || lastRow >= count} className={`${style.paginatorButton}`}  onClick={() => onPagination(count - limit)}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                </button>
            </span>

            <select className={style.rowsSelect} name="rows" id="rows" value={limit} onChange={({ target }) => onRowsChange(parseInt(target.value))}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}