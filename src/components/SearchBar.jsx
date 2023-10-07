import QueryFilters from "@/models/query-filters";
import { fetchElements } from "@/services/list";
import { useState } from "react"

export default function SearchBar({
    uriSegment = "",
    setElements,
    setError,
}) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchElements(uriSegment,);

            if (!response.ok) throw new Error(response.status, response.statusText);

            let { results } = await response.json();

            results = results.filter(({ name }) => name.startsWith(inputValue.trim()));

            setElements(results);
        } catch (err) {
            // setError(err.message);
            console.error(err)
        }
    }

    const handleReset = (e) => {
        setInputValue("");
        setElements([]);
    }

    if (!uriSegment.trim()) return <></>

    return (
        <form autoComplete="off" onSubmit={handleSubmit} onReset={handleReset}>
            <input type="text" value={inputValue} onInput={({target}) => setInputValue(target.value)} />
            <button type="submit">Search</button>
            <button type="reset">Reset</button>
        </form>
    )
}