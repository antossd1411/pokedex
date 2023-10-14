import Image from "next/image";
import { useState } from "react"
import styles from "@/styles/components/Carousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import loadImagePath from "@/utils/image/loader";

export default function Carousel({
    images = [],
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(1);
    let prevImageUrl; let prevImageIndex;
    let currentImageUrl;
    let nextImageUrl; let nextImageIndex;

    const getPrevImage = (newIndex = 0) => {
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }

        setCurrentImageIndex(newIndex);
    }

    const getNextImage = (newIndex = 0) => {
        if (newIndex === images.length) {
            newIndex = 0;
        }

        setCurrentImageIndex(newIndex);
    }

    if (images.length == 0) {
        return '';
    }

    prevImageIndex = currentImageIndex - 1;
    nextImageIndex = currentImageIndex + 1;

    if (currentImageIndex === 0) {
        prevImageIndex = images.length - 1;
        nextImageIndex = currentImageIndex + 1;
    }

    if (currentImageIndex === images.length - 1) {
        prevImageIndex = currentImageIndex - 1;
        nextImageIndex = 0;
    }

    prevImageUrl = images[prevImageIndex].replace(process.env.POKEIMAGES_URL, '');
    currentImageUrl = images[currentImageIndex].replace(process.env.POKEIMAGES_URL, '');
    nextImageUrl = images[nextImageIndex].replace(process.env.POKEIMAGES_URL, '');

    return (
        <div className={styles.section}>
            <div className={styles.imageContainer}>
                <Image
                    src={prevImageUrl}
                    width={150}
                    height={150}
                    alt={`Sprite number ${currentImageIndex + 1}`}
                    loader={loadImagePath}
                />
                <Image
                    src={currentImageUrl}
                    width={150}
                    height={150}
                    alt={`Sprite number ${currentImageIndex + 1}`}
                    loader={loadImagePath}
                />
                <Image
                    src={nextImageUrl}
                    width={150}
                    height={150}
                    alt={`Sprite number ${currentImageIndex + 1}`}
                    loader={loadImagePath}
                />
            </div>
            <div className={styles.buttonContainer}>
                <button className={`${styles.button} ${styles.marginRight}`} onClick={() => getPrevImage(currentImageIndex - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <button className={styles.button} onClick={() => getNextImage(currentImageIndex + 1)}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
        </div>
    )
}