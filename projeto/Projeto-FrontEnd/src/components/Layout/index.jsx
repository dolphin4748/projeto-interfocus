import { Link, RenderComponent } from "simple-react-routing"

export function Menu() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/clientes">Clientes</Link>
                </li>
                <li>
                    <Link to="/dividas">Dividas</Link>
                </li>
            </ul>
        </nav>)
}

export function Footer() {
    return <footer>
        <p>{new Date().getFullYear()} - Todos os direitos reservados &copy;</p>
    </footer>
}

export function Layout() {
    return <>
        <header>
            <Menu></Menu>
        </header>
        <main>
            <RenderComponent />
        </main>
        <Footer></Footer>
    </>
}