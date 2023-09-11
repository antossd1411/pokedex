import Paginator from "@/components/Paginator";
import ApiResponse from "@/models/api-response";
import QueryFilters from "@/models/query-filters";
import { fetchPokemon } from "@/services/pokemon";
import Link from "next/link";
import { useState } from "react"

export default function PokemonIndex({}) {
    const [apiResponse, setApiResponse] = useState(new ApiResponse({}));
    const [filters, setFilters] = useState(new QueryFilters({}));

    const handlePagination = (offset = 0) => {
        const newFilters = new QueryFilters({
            ...filters, offset: offset,
        })

        fetchData(newFilters);
    }

    const handleRowsChange = ({ value }) => {
        const rows = parseInt(value);

        const newFilters = new QueryFilters({
            ...filters, limit: rows,
        })

        fetchData(newFilters);
    }

    const fetchData = async (filterParam = new QueryFilters({})) => {

        setFilters(filterParam);

        try {

            const response = await fetchPokemon(filterParam);

            if (!response.ok) {
                throw new Error(response.status.toString(), response.statusText);
            }

            const result = await response.json();

            setApiResponse(result);

        } catch (err) {

            console.error(err)
        }
    }

    const getIdFromUrl = (url = "") => {
        return url.split('/').filter((uriFragment) => uriFragment).pop();
    }

    return (
        <main>
            <button type="button" onClick={() => fetchData()}>Fetch</button>

            <ul>
                {
                    apiResponse.results.map((pokemon,) => {
                        return <li key={getIdFromUrl(pokemon.url)}>
                            <Link href={"/pokemon/" + getIdFromUrl(pokemon.url)}> { pokemon.name } </Link>
                        </li>
                    })
                }
            </ul>

            <Paginator count={apiResponse.count} limit={filters.limit} offset={filters.offset} onPagination={handlePagination} onRowsChange={handleRowsChange} />
        </main>
    )
}