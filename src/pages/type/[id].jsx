import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Types from "@/models/type";
import { fetchType } from "@/services/type";

export default function Type() {
    const router = useRouter();
    const [type, setType] = useState(new Types({}));

    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchType(id);

                if (!response.ok) {
                    throw new Error("Getting Type Data: ".concat(response.status));
                }

                const result = await response.json();

                if (result) {
                    setType(new Types({ ...result }));
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (type.id === 0) {
        return '';
    }

    const damageRelations = Object.entries(type.damage_relations);

    return (
        <div>
            <p>
                {
                    type.name
                }
            </p>
            <section>
                <p>Move damage class</p>
                <p> { type.move_damage_class.name } </p>
            </section>
            <section>
                <p>
                    Damage relations
                </p>
                <ul>
                    {
                        damageRelations.map(([key, value]) => {
                            const formattedKey = key.replace(/[_]/g, ' ');
                            const values = value.map((type) => type.name).join(', ');

                            return <li key={key}> {formattedKey}: {values} </li>
                        })
                    }
                </ul>
            </section>
            <section>
                <p>Moves</p>
                <ul>
                    {
                        type.moves.map(move => {
                            return <li key={move.name}> { move.name } </li>
                        })
                    }
                </ul>
            </section>
            <section>
                <p>Pokemon</p>
                <ul>
                    {
                        type.pokemon.map(pokemon => {
                            return <li key={pokemon.pokemon.name}> { pokemon.pokemon.name } </li>
                        })
                    }
                </ul>
            </section>
        </div>
    )
}