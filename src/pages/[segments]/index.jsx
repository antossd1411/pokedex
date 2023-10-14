import { fetchElements } from "@/services/list";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/PokemonList.module.css";
import ListElement from "@/components/ListElement";

export default function MainList({}) {
    const elements = useRef([]);

    const [stateElements, setStateElements] = useState([]);

    const [filteringName, setFilteringName] = useState("");

    const [sortingAttribute, setSortingAttribute] = useState("id");
    const [isDesc, setIsDesc] = useState(false);

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchElements('pokemon');

            if (!response.ok) {
                throw new Error("Fetching error: ".concat(response.status));
            }

            const { results } = await response.json();

            elements.current = results;

            setCount(elements.current.length);
            setStateElements(elements.current.slice(0, 20));
        }

        fetchData();
    }, [])

    const handleFilter = ({ value }) => {
        const filteredElements = filterByName(value, elements.current);
        const newElements = sort(sortingAttribute, isDesc, filteredElements);
        
        setFilteringName(value);
        setCount(newElements.length)
        setPage(1);
        setStateElements(newElements.slice(0, 20));
    }

    function filterByName(filter = "", elements = []) {
        return elements.filter(({ name }) => name.startsWith(filter.toLowerCase()));
    }

    function sort(attribute = "", isDesc = false, elements = []) {
        let newElements = Array.from(elements);

        if (attribute.toLowerCase() === "id") {
            newElements.sort((a, b) => {
                const aId = a.url.split('/').filter((segment) => segment).pop();
                const bId = b.url.split('/').filter((segment) => segment).pop();

                if (isDesc) {
                    return bId - aId;
                }

                return aId - bId;
            });
        }

        if (attribute.toLowerCase() === "name") {
            newElements.sort((a, b) => {
                if (isDesc) {
                    return b.name.localeCompare(a.name);
                }

                return a.name.localeCompare(b.name);
            });
        }

        return newElements;
    }

    const handleSorting = ({ value }, isDesc = false) => {
        if (value !== sortingAttribute) {
            setSortingAttribute(value);
        }

        setPage(1);

        const filteredElements = filterByName(filteringName, elements.current);

        setStateElements(sort(value, isDesc, filteredElements).slice(0, 20));
    }

    const handleSortingCheck = ({ checked }) => {
        setIsDesc(checked);
        handleSorting({ value: sortingAttribute }, checked);
    }

    const handlePagination = (newPage = 1) => {
        const filteredElements = filterByName(filteringName, elements.current);
        const sortedElements = sort(sortingAttribute, isDesc, filteredElements);

        setPage(newPage);
        setStateElements(sortedElements.slice((newPage - 1) * 20, newPage * 20));
    }

    const totalPages = Math.ceil(count / 20);

    return (
        <>
            <section>
                <input type="text" id="filterName" name="filterName" placeholder="Filter by name" value={filteringName} onInput={({target}) => handleFilter(target)} />
                <label htmlFor="sortBySelector">
                    Sort by
                    <select id="sortBySelector" name="sortBySelector" value={sortingAttribute} onChange={({target}) => handleSorting(target, isDesc)}>
                        <option value="id">Id</option>
                        <option value="name">Name</option>
                    </select>
                </label>
                <label htmlFor="sortingOrder">
                    <input type="checkbox" id="sortingOrder" name="sortingOrder" value={isDesc} onChange={({target}) => handleSortingCheck(target)} />
                    DESC
                </label>
            </section>
            <section>
                <ul className={styles.listContainer}>
                    {
                        stateElements.map((el) => {
                            return <ListElement key={el.name} data={el} />
                        })
                    }
                </ul>
            </section>
            <section>
                Page { page } - { totalPages }
                <button disabled={page === 1} onClick={() => handlePagination()}>To Atra</button>
                <button disabled={page === 1} onClick={() => handlePagination(page - 1)}>Atra</button>
                <button disabled={page === totalPages} onClick={() => handlePagination(page + 1)}>Alante</button>
                <button disabled={page === totalPages} onClick={() => handlePagination(totalPages)}>To Alante</button>
            </section>
        </>
    )
}