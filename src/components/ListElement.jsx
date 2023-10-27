import styles from "@/styles/components/ListElement.module.css";
import loadImagePath from "@/utils/image/loader";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ListElement({
    data = null,
}) {
    const router = useRouter();

    const id = data.url.split('/').filter(segment => segment).pop();

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={`/sprites/master/sprites/pokemon/${id}.png`}
                    alt={`${data.name} default sprite`}
                    width={100}
                    height={100}
                    style={{objectFit: "contain"}}
                    loader={loadImagePath}
                />
            </div>
            <div>
                <p className={styles.number}>#{ id.toString().padStart(4, '0') }</p>
                <p className={styles.name}>{ data.name }</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => router.push(`/pokemon/${id}`)}>Ver mas</button>
            </div>
        </article>
    )
}