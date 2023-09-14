import { useEffect, useState } from "react";
import { fetchPokemonByName } from "@/services/pokemon";
import { useRouter } from "next/router";
import Pokemons from "@/models/pokemon";

export async function getServerSideProps({ params }) {
    try {
        const { name } = params;

        if (!name) {
            return {
                redirect: {
                    destination: "/pokemon",
                    permanent: false,
                }
            }
        }

        return {
            props: {
                name: name,
            }
        };
    } catch (err) {
        return {
            redirect: {
                destination: "/500",
                permanent: false,
            }
        }
    }
}

export default function Pokemon({ name }) {
    const [pokemon, setPokemon] = useState(new Pokemons({}));
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await fetchPokemonByName(name);

                setIsLoading(false);

                if (!response.ok) {
                    if (response.status === 404) {
                        router.replace("/404");
                    }

                    throw new Error("An error has occurred (Error code:", response.status, ")");
                }

                const result = await response.json();

                setPokemon(new Pokemons({ ...result }));
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);

    if (isLoading) return <p>Loading...</p>

    return (
        <main>
            <aside>
                <p> { pokemon.order.toString().padStart(4, '0') } - { pokemon.name } { pokemon.is_default && "(Initial)" } </p>
                <p> Height: { pokemon.height } </p>
                <p> Weight: { pokemon.weight } </p>
                <p>Types</p>
                <ul>
                    {
                        pokemon.types.map((type) => (<li key={type.slot}> { type.type.name } </li>))
                    }
                </ul>
                <p>Abilities</p>
                <ul>
                    {
                        pokemon.abilities.map((ability) => (<li key={ability.slot}> { ability.ability.name } { ability.is_hidden && " (Hidden)" } </li>))
                    }
                </ul>
                <p>Stats</p>
                <ul>
                    {
                        pokemon.stats.map((stat) => (<li key={stat.stat.name}> { stat.stat.name }: { stat.base_stat } </li>))
                    }
                </ul>
            </aside>
            <section>
                <p>Moves</p>
                <ul>
                    {
                        pokemon.moves.map((move) => (<li key={move.move.name}> { move.move.name } </li>))
                    }
                </ul>
            </section>
        </main>
    )
}