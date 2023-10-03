import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "./Nav";
import { useState } from "react";
import styles from "@/styles/components/Header.module.css";

export default function Header() {
    const [show, setShow] = useState(false);

    return (
        <>
            <header className={styles.header}>
                <FontAwesomeIcon icon={faBars} onClick={() => setShow(true)} />
                Pokedex
            </header>
            <Nav show={show} setShow={setShow} />
        </>
    )
}