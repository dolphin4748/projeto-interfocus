import { useEffect, useState } from "react";
import { listarClientes } from "../../services/clienteService";
import { useNavigation } from "simple-react-routing";

export default function HomePage() {
const [clientes, setClientes] = useState([]);

    const [search, setSearch] = useState("");

    const { navigateTo } = useNavigation();

    const fetchData = async () => {
        const resultado = await listarClientes(search);
        if (resultado.status == 200) {
            setClientes(resultado.data);
        }
    }

    useEffect(() => {
        // debounce
        var timeout = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [search]);

    return <div>
        <div className="row">
            <label>Pesquisa: </label>
            <input type="search"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                } />

            <button
                //onClick={(e) => navigateTo(e, "/clientes/novo")}
                type="button">Novo</button>
        </div>
        <div className="grid-cards">
            {clientes.map(a =>
                <ClienteCard key={a.id} cliente={a}></ClienteCard>)}
        </div>
    </div>
}

function ClienteCard({ cliente }) {

    const { navigateTo } = useNavigation();

    return <div class="card"
        //onClick={(e) => navigateTo(e, "/clientes/edit/" + cliente.id)}
    >
        <h4>{cliente.nome}</h4>
        <ul>
            <li>
                <img height="72" src={cliente.foto}></img>
            </li>
            <li>
                <strong>ID:</strong> {cliente.id}
            </li>
            <li>
                <strong>Idade:</strong> {cliente.idade}
            </li>
            <li>
                <strong>E-mail:</strong> {cliente.email}
            </li>
            <li>
                <strong>Total em Divida:</strong> R${cliente.totalDivida}
            </li>
        </ul>
    </div>
}