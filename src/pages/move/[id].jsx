import Moves from "@/models/move";
import { fetchMove } from "@/services/move";
import getIdFromUrl from "@/utils/image/string";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react"

export async function getStaticPaths() {
    return {
        paths: new Array(922).map((_, index) => index + 1),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { id } = params;
    return {
        props: {
            id
        }
    }
}

export default function Move({ id }) {
    const [move, setMove] = useState(new Moves({}));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMove(id);

                if (!response.ok) {
                    throw new Error("Getting Move Data: ".concat(response.status));
                }

                const result = await response.json();

                if (result) {
                    setMove(new Moves({ ...result }));
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (move.id === 0) return (
        <Head>
            <title>Move | Pokemon</title>
        </Head>
    )

    const name = move.name.charAt(0).toUpperCase() + move.name.substring(1);

    return (
        <>
            <Head>
                <title>{ name } | Move</title>
            </Head>
            <div>
                <aside>
                    <p>
                        { name }
                    </p>
                    <p>
                        Accuracy: { move.accuracy }
                    </p>
                    <p>
                        Damage class: { move.damage_class.name }
                    </p>
                    <p>
                        Power: { move.power }
                    </p>
                    <p>
                        Power points (PP): { move.pp }
                    </p>
                    <p>
                        Priority: { move.priority }
                    </p>
                    <p>
                        Type: { move.type.name }
                    </p>
                </aside>
                <section>
                    <ul>
                        <p>Learned by</p>
                        {
                            move.learned_by_pokemon.map((pokemon) => {
                                const id = getIdFromUrl(pokemon.url);
                                return <Link key={pokemon.name} href={`/pokemon/${id}`}>
                                    <li>{ pokemon.name }</li>
                                </Link>
                            })
                        }
                    </ul>
                </section>
            </div>
        </>
    )
}