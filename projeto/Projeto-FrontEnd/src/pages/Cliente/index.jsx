import { useEffect, useState, useReducer, useMemo } from "react";
import { listarClientes, salvarCliente, getClienteById } from "../../services/clienteService";
import Modal from "../../components/Modal";

const tamPagina = 10;

export default function ClientePage() {
    const [clientes, setClientes] = useState([]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState(null);

    const [erros, setErros] = useState([]);

    const [cpf, setCpf] = useReducer(
        (oldValue, newValue) => {
            if (newValue) {
                const apenasDigitos =
                    newValue.replace(/[^\d]/g, "").substr(-11);
                const valorMascarado = apenasDigitos
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})(\d{2})$/, "$1-$2");
                return valorMascarado;
            }
        }, "");

    const params = new URLSearchParams(window.location.search);

    const [paginaAtual, setPaginaAtual] = useState(1);
    
    const clientesAtual = useMemo(() => {
        const primeiroIdx = (paginaAtual - 1) * tamPagina;
        const ultimoIdx = primeiroIdx + tamPagina;
        return clientes.slice(primeiroIdx, ultimoIdx);
    }, [paginaAtual, clientes]);

    const totalPaginas = Math.ceil(clientes.length / tamPagina);

    const fetchData = async () => {
        const resultado = await listarClientes(search);
        if (resultado.status == 200) {
            setClientes(resultado.data);
        }
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const cliente = {
            nome: formData.get("nome"),
            email: formData.get("email"),
            cpf: formData.get("cpf"),
            dataNascimento: formData.get("data-nascimento")
        };
        if (selected?.id) {
            cliente.id = selected.id;
        }
        const resultado = await salvarCliente(cliente);
        if (resultado.status == 200) {
            setOpen(false);
            fetchData();
        }else {
            if (resultado.status == 422) {
                setErros(resultado.data);
            }
        }
    }

    useEffect(() => {
        var timeout = setTimeout(() => {
            fetchData();
        }, 500);

        return () => {
            clearTimeout(timeout);
        }
    }, [search]);

    useEffect(() => {
        var timeout = setTimeout(() => {
            setErros([]);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        }
    }, [erros]);

    const selecionarLinha = async (cliente) => {
        const resultado = await getClienteById(cliente.id);
        if (resultado.status == 200) {
            setSelected(resultado.data);
            setOpen(true);
        }
    };

    return <div>
        <h1>Clientes</h1>
        <div className="row">
            <label>Pesquisa: </label>
            <input type="search"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                } />

            <button type="button" onClick={() => {
                setOpen(true);
                setSelected(null);
            }}>Novo Cliente</button>
        </div>
        <table id="tabela-clientes">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Idade</th>
                    <th>Total em divida</th>
                    <th>Data Cadastro</th>
                </tr>
            </thead>
            <tbody>
                {
                    clientesAtual.map(cliente =>
                        <LinhaCliente key={cliente.id}
                            cliente={cliente}
                            onClick={() => selecionarLinha(cliente)}></LinhaCliente>
                    )
                }
            </tbody>
        </table>

        <div className="pagination">
            <button
                onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
                disabled={paginaAtual === 1}>
                ← Anterior
            </button>
            {[...Array(totalPaginas)].map((_, idx) => {
                const page = idx + 1;
                return (
                    <button
                    key={page}
                    onClick={() => setPaginaAtual(page)}
                    style={{
                        fontWeight: page === paginaAtual ? 'bold' : 'normal',
                        filter: page === paginaAtual ? 'brightness(0.5)' : 'brightness(1)',
                    }}
                    >
                    {page}
                    </button>
                );
            })}
            <button
                onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
                disabled={paginaAtual === totalPaginas}
                >
                Próximo →
            </button>
        </div>

        <Modal open={open}>
                <form method="post" onSubmit={submitForm}>
                    <label>Nome:</label>
                    <input defaultValue={selected?.nome} required type="text" name="nome"/>
                    <label>Email:</label>
                    <input defaultValue={selected?.email} type="text" name="email"/>
                    <label>CPF:</label>
                    <input
                        value={cpf}
                        onKeyDown={(e) => {
                            if (e.key.length == 1 && !e.key.match(/\d/)) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => setCpf(e.target.value)}
                        defaultValue={selected?.cpf} required type="text" name="cpf"/>
                    <label>Data de nascimento:</label>
                    <input defaultValue={selected?.dataNascimento.split("T")[0]} required name="data-nascimento" type="date"/>
                    <div className="column">
                        {erros.map(e => <strong className="error">{e.propriedade}: {e.mensagem}</strong>)}
                    </div>
                    <div className="row">
                        <button type="submit">Cadastrar</button>
                        <button type="reset" onClick={() => setOpen(false)}>Cancelar</button>
                    </div>
                </form>
        </Modal>
    </div>
}

function LinhaCliente({ cliente, onClick }) {
    const data = new Date(cliente.dataCadastro);

    return (<tr onClick={onClick}>
        <td>{cliente.id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.email}</td>
        <td>{cliente.cpf}</td>
        <td>{cliente.idade}</td>
        <td>{cliente.totalDivida}</td>
        <td>{data.toLocaleString()}</td>
    </tr>)
}