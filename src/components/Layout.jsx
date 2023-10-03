import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <main>{ children }</main>
            {/* <Footer></Footer> */}
        </>
    )
}