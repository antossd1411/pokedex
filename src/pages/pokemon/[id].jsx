import Carousel from "@/components/Carousel";
import Pokemons from "@/models/pokemon";
import { fetchPokemon } from "@/services/pokemon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import styles from "@/styles/PokemonPage.module.css";
import Link from "next/link";
import Head from "next/head";

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

    if (pokemon.id === 0) return '';

    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
    const sprites = Object.values(pokemon.sprites).filter(url => url && typeof url === 'string');

    return (
        <>
            <Head>
                <title>{name} | Pokedex</title>
            </Head>
            <div className={styles.container}>
                <aside className={styles.aside}>
                    <strong>
                        { name }
                    </strong>
                    <p>
                        { pokemon.is_default && '(Default)' }
                    </p>
                    <p>
                        { "#".concat(pokemon.order.toString().padStart(4, '0')) }
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
                                    <li className={styles.link}> { type.type.name } </li>
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
                                const url = ability.ability.url.replace(process.env.POKEAPI_URL, '');

                                return <Link key={ability.slot} href={`${url}`}>
                                    <li className={styles.link}> { ability.ability.name } { ability.is_hidden && "(Hidden)" } </li>
                                </Link>
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
                                    const url = move.move.url.replace(process.env.POKEAPI_URL, '');
                                    
                                    return <Link key={move.move.name} href={url}> <li> { move.move.name } </li> </Link>
                                })
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </>
    )
}