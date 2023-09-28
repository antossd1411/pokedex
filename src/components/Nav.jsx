import { fetchNavItems } from "@/services/navbar";
import Link from "next/link";
import { useEffect, useState } from "react"
import styles from "@/styles/components/Nav.module.css"

export default function Nav() {
    const [navItems, setNavItems] = useState([]);

    const orginizeItems = (items = {}) => {
        const organizedItems = [];
        const firstLevelItems = Object.keys(items).filter(item => !item.includes('-')).sort((a, b) => a.localeCompare(b));
        const children = Object.keys(items).filter(item => !firstLevelItems.includes(item));

        firstLevelItems.reduce((acc, cur) => {
            const itemChildren = children.filter((item) => item.startsWith(cur));

            acc.push({
                name: cur,
                children: itemChildren,
            });

            return acc;
        }, organizedItems);

        return organizedItems;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchNavItems();

                if (!response.ok) {
                    throw new Error(response.status, ": ", response.statusText);
                }

                const result = await response.json();

                setNavItems(orginizeItems(result));
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
                        return <li key={item.name} className={styles.li}>
                            <Link href={`/${item.name}`} className={styles.link}> { item.name } </Link>
                            {
                                (item.children.length > 0) &&
                                <ul>
                                    {
                                        item.children.map((child) => (<li key={child}> <Link href={`/${child}`} className={styles.link}> { child } </Link> </li>))
                                    }
                                </ul>
                            }
                        </li>
                    })
                }
            </ul>
        </nav>
    )
}