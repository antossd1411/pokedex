import { useEffect, useState } from "react"
import Link from "next/link";
import getIdFromUrl from "@/utils/image/string";
import Head from "next/head";
import { fetchItem } from "@/services/item";
import Items from "@/models/item";

export function getStaticPaths() {
    return {
        paths: new Array(2110).map((_, index) => index + 1),
        fallback: false,
    }
}

export function getStaticProps({ params }) {
    const { id } = params;
    return {
        props: {
            id
        }
    }
}

export default function Type({ id }) {
    const [item, setItem] = useState(new Items({}));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchItem(id);

                if (!response.ok) {
                    throw new Error("Getting Item Data: ".concat(response.status));
                }

                const result = await response.json();

                if (result) {
                    setItem(new Items({ ...result }));
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (item.id === 0) return (
        <Head>
            <title>Item | Pokedex</title>
        </Head>
    )
    const name = item.name.charAt(0).toUpperCase() + item.name.substring(1);

    return (
        <>
            <Head>
                <title>{ name.concat(" | Item") }</title>
            </Head>
            <div>
                <p>
                    {
                        name
                    }
                </p>
            </div>
        </>
        )
}