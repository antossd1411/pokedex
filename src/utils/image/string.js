export default function getIdFromUrl (url = "") {
    return url.split('/').filter(segment => segment).pop();
}