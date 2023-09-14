export default function loadImagePath({ src }) {
    return `${process.env.POKEIMAGES_URL}/${src}`;
}