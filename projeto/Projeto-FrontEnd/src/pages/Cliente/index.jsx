import { useEffect, useState } from "react";
import { listarClientes } from "../../services/clienteService";
import { useNavigation } from "simple-react-routing";

export default function ClientePage() {
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
        <h1>Clientes</h1>
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
        <table id="tabela-clientes">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Idade</th>
                    <th>Total em divida</th>
                    <th>Data Cadastro</th>
                </tr>
            </thead>
            <tbody>
                {
                    clientes.map(cliente =>
                        <LinhaCliente key={cliente.id}
                            cliente={cliente}
                            onClick={() => selecionarLinha(cliente)}></LinhaCliente>
                    )
                }
            </tbody>
        </table>
    </div>
}

function LinhaCliente({ cliente, onClick }) {
    const data = new Date(cliente.dataCadastro);

    return (<tr onClick={onClick}>
        <td>{cliente.id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.email}</td>
        <td>{cliente.idade}</td>
        <td>{cliente.totalDivida}</td>
        <td>{data.toLocaleString()}</td>
    </tr>)
}