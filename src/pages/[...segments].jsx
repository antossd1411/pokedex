import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router"

export default function List({}) {
    const router = useRouter();
    let segment = "";

    if (router.query.segments) segment = router.query.segments[0];

    return (
        <section>
            <SearchBar uriSegment={segment} />
            {/* Lista */}
            {/* Paginador */}
        </section>
    )
}