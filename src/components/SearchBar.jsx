import { useState } from "react"

export default function SearchBar({
    uriSegment = "",
}) {
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    const handleReset = (e) => {
        setInputValue("");
    }

    if (!uriSegment.trim()) return <p>Wrong URI. Try with /pokemon, /item...</p>

    return (
        <form autoComplete="off" onSubmit={handleSubmit} onReset={handleReset}>
            <input type="text" value={inputValue} onInput={({target}) => setInputValue(target.value)} />
            <button type="submit">Search</button>
            <button type="reset">Reset</button>
        </form>
    )
}