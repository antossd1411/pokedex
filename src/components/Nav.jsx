import { fetchNavItems } from "@/services/navbar";
import Link from "next/link";
import { useEffect, useState } from "react"
import styles from "@/styles/components/Nav.module.css"

export default function Nav() {
    const [navItems, setNavItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchNavItems();
                if (!response.ok) {
                    throw new Error("");
                }
                const result = await response.json();
                // This is provisional
                setNavItems(Object.keys(result).filter((item) => !item.includes('-')));
            } catch (err) {
                console.error(err)
            }
        }

        fetchData();
    }, [])

    return (
        <nav>
            <ul className={styles.container}>
                {
                    navItems.map((item) => {
                        return <li key={item} className={styles.li}>
                            <Link href={`/${item}`} className={styles.link}> { item } </Link>
                        </li>
                    })
                }
            </ul>
        </nav>
    )
}