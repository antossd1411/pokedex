import Carousel from "@/components/Carousel";
import Pokemons from "@/models/pokemon";
import { fetchPokemon } from "@/services/pokemon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import styles from "@/styles/PokemonPage.module.css";
import Link from "next/link";

export default function Pokemon() {
    const router = useRouter();
    const [pokemon, setPokemon] = useState(new Pokemons({}));

    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPokemon(id);

                if (!response.ok) {
                    throw new Error("Getting Pokemon Data: ".concat(response.status));
                }

                const result = await response.json();

                if (result) {
                    setPokemon(new Pokemons({ ...result }));
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    const sprites = Object.values(pokemon.sprites).filter(url => url && typeof url === 'string');

    return (
        <div className={styles.container}>
            <aside>
                <strong>
                    { pokemon.name }
                </strong>
                <p>
                    { pokemon.is_default && '(Default)' }
                </p>
                <p>
                    { pokemon.order.toString().padStart(4, '0') }
                </p>
                <p>Base XP: { pokemon.base_experience }</p>
                <p>
                    Height: { pokemon.height }
                </p>
                <p>
                    Weight: { pokemon.weight }
                </p>
                <ul>
                    <p>Types</p>
                    {
                        pokemon.types.map(type => {

                            const url = type.type.url.replace(process.env.POKEAPI_URL, '');
                            
                            return <Link key={type.slot} href={`${url}`}>
                                <li> { type.type.name } </li>
                            </Link>
                        })
                    }
                </ul>
                <ul>
                    <p>Stats</p>
                    {
                        pokemon.stats.map(stat => {
                            return <li key={stat.stat.name}>
                                { stat.stat.name }: { stat.base_stat }
                            </li>
                        })
                    }
                </ul>
                <ul>
                    <p>Abilities</p>
                    {
                        pokemon.abilities.map(ability => {
                            return <li key={ability.slot}>
                                { ability.ability.name } { ability.is_hidden && "(Hidden)" }
                            </li>
                        })
                    }
                </ul>
            </aside>
            <section>
                <Carousel images={sprites} />
                <div>
                    <p>Moves</p>
                    <ul className={styles.moves}>
                        {
                            pokemon.moves.map(move => {
                                return <li key={move.move.name}>
                                    { move.move.name }
                                </li>
                            })
                        }
                    </ul>
                </div>
            </section>
        </div>
    )
}