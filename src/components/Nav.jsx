import { fetchNavItems } from "@/services/navbar";
import Link from "next/link";
import { useEffect, useState } from "react"
import styles from "@/styles/components/Nav.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";

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
                toggled: false,
            });

            return acc;
        }, organizedItems);

        return organizedItems;
    }

    const toggleNavItemChildren = (item = "") => {
        const itemIndex = navItems.findIndex(({ name }) => name === item);

        if (itemIndex > -1) {
            const currentItems = navItems.map((item, index) => {
                if (index !== itemIndex && item.toggled) {
                    item.toggled = false;
                }

                return item;
            });

            const isToggled = currentItems[itemIndex].toggled;

            currentItems[itemIndex].toggled = !isToggled;

            setNavItems(currentItems);
        }
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
        <nav className={styles.nav}>
            <ul className={styles.container}>
                <p className={styles.closeContainer}>
                    <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={() => console.log("Close!")} />
                </p>

                {
                    navItems.map((item) => {
                        return <li key={item.name} className={styles.li}>
                            <div className={styles.liHeader}>
                                <Link href={`/${item.name}`} className={styles.link}> { item.name } </Link>

                                {
                                    item.children.length > 0 &&
                                    <FontAwesomeIcon
                                        icon={faCaretDown}
                                        rotation={item.toggled ? 270 : 0}
                                        onClick={() => toggleNavItemChildren(item.name)}
                                    />
                                }
                            </div>

                            {
                                (item.children.length > 0 && item.toggled) &&
                                <ul className={styles.childrenList}>
                                    {
                                        item.children.map((child) => (<li key={child} className={styles.li}> <Link href={`/${child}`} className={styles.link}> { child.replace('-', ' ') } </Link> </li>))
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