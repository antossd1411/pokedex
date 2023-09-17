import Paginator from "@/components/Paginator";
import ApiResponse from "@/models/api-response";
import QueryFilters from "@/models/query-filters";
import { fetchPokemon } from "@/services/pokemon";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react"
import loadImagePath from "@/utils/image/loader";
import Nav from "@/components/Nav";

export default function PokemonIndex({}) {
    const [apiResponse, setApiResponse] = useState(new ApiResponse({}));
    const [filters, setFilters] = useState(new QueryFilters({}));
    const [isLoading, setIsLoading] = useState(false);
    const auxPokemonList = useRef([]);

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
        setIsLoading(true);

        try {

            const response = await fetchPokemon(filterParam);

            setIsLoading(false);

            if (!response.ok) {
                throw new Error(response.status.toString(), response.statusText);
            }

            const result = await response.json();

            auxPokemonList.current = result.results;
            setApiResponse(result);

        } catch (err) {

            console.error(err)
        }
    }

    const getIdFromUrl = (url = "") => {
        return url.split('/').filter((uriFragment) => uriFragment).pop();
    }

    const filterListByItemName = ({ value }) => {
        let newResult;

        if (!value.trim()) {
            newResult = auxPokemonList.current;
        } else {
            newResult = auxPokemonList.current.filter(({ name }) => name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
        }

        setApiResponse((prev) => ({ ...prev, results: newResult }));
    }

    if (isLoading) {
        return (
            <p>Loading...</p>
        )        
    }

    return (
        <>
            <Nav />
            <main>
                <button type="button" onClick={() => fetchData()}>Fetch</button>
                <br />
                <input type="text" name="name-filter" id="name-filter" onInput={(e) => filterListByItemName(e.target)} />

                <ul>
                    {
                        apiResponse.results.map((pokemon,) => {
                            return <li key={getIdFromUrl(pokemon.url)}>
                                <Image
                                    src={`sprites/master/sprites/pokemon/${getIdFromUrl(pokemon.url)}.png`}
                                    alt={pokemon.name}
                                    width={75}
                                    height={75}
                                    loader={loadImagePath}
                                />
                                <Link href={"/pokemon/" + pokemon.name}> { pokemon.name } </Link>
                            </li>
                        })
                    }
                </ul>

                <Paginator count={apiResponse.count} limit={filters.limit} offset={filters.offset} onPagination={handlePagination} onRowsChange={handleRowsChange} />
            </main>
        </>
    )
}