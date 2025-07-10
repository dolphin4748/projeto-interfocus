import { useEffect, useState, useMemo } from "react"
import { getDividaById, listarDividas, salvarDivida } from "../../services/dividaService";
import { listarClientes} from "../../services/clienteService";
import Modal from "../../components/Modal";

const tamPagina = 10;

export default function DividaPage() {

    const [dividas, setDividas] = useState([]);

    const [clientes, setClientes] = useState([]);

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState(null);

    const [cltid, setCltid] = useState(null)

    const [situacao, setSituacao] = useState("");

    const params = new URLSearchParams(window.location.search);

    const [erros, setErros] = useState([]);

    const [search, setSearch] = useState(params.get("q"));

    const [cliente, setCliente] = useState(params.get("q"));

    const [paginaAtual, setPaginaAtual] = useState(1);

    const dividasAtual = useMemo(() => {
        const primeiroIdx = (paginaAtual - 1) * tamPagina;
        const ultimoIdx = primeiroIdx + tamPagina;
        return dividas.slice(primeiroIdx, ultimoIdx);
    }, [paginaAtual, dividas]);

    const totalPaginas = Math.ceil(dividas.length / tamPagina);

    const fetchData = async () => {
        const resultado = await listarDividas(search, cliente);
        const resultado2 = await listarClientes("")
        if (resultado.status == 200) {
            setDividas(resultado.data);
        }
        if (resultado2.status == 200) {
            setClientes(resultado2.data);
        }
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const situacao = formData.get("situacao")? true : false

        const divida = {
            valor: formData.get("valor"),
            clienteId: formData.get("cliente"),
            descricao: formData.get("descricao"),
            situacao: situacao,
            dataPagamento: formData.get("data-pagamento")
        };
        if (selected?.id) {
            divida.id = selected.id;
        }
        const resultado = await salvarDivida(divida);
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
        if (selected) {
            setSituacao(selected.situacao ? "true" : "");
            setCltid(selected.clienteId);
        }else {
            setSituacao("");
            setCltid(1)
        }
    }, [selected]);

    useEffect(() => {
        var timeout = setTimeout(() => {
            fetchData();
        }, 500);

        return () => {
            clearTimeout(timeout);
        }
    }, [search, cliente]);

    useEffect(() => {
        setPaginaAtual(1);
    }, [clientes]);

    useEffect(() => {
        var timeout = setTimeout(() => {
            setErros([]);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        }
    }, [erros]);

    const selecionarLinha = async (divida) => {
        const resultado = await getDividaById(divida.id);
        if (resultado.status == 200) {
            setSelected(resultado.data);
            setOpen(true);
        }
    };

    return (<>
        <h1>DIVIDAS</h1>

        <div className="row">
            <label>Pesquisa:</label>
            <input name="pesquisa"
                type="search"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />
            <label>Pesquisa por cliente:</label>
            <select name="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)}>
                <option value="0">nenhum</option>
                {
                    clientes.map(clt =>
                        <option key={clt.id} value={clt.id}>{clt.nome}</option>
                    )
                }
            </select>
            <button type="button" onClick={() => {
                setOpen(true);
                setSelected(null);
            }}>Nova Divida</button>
        </div>

        <table id="tabela-dividas">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Valor</th>
                    <th>Cliente</th>
                    <th>situação</th>
                    <th>Data Pagamento</th>
                    <th>Data Cadastro</th>
                </tr>
            </thead>
            <tbody>
                {
                    dividasAtual.map(divida =>
                        <LinhaDivida key={divida.id}
                            clientes={clientes}
                            divida={divida}
                            onClick={() => selecionarLinha(divida)}></LinhaDivida>
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
                <label>Valor:</label>
                <input defaultValue={selected?.valor} required type="number" name="valor"/>
                <label>Cliente:</label>
                <select value={cltid} onChange={(e) => setCltid(e.target.value)} required name="cliente">
                    {
                        clientes.map(clt =>
                            <option key={clt.id} value={clt.id}>{clt.nome}</option>
                        )
                    }
                </select>
                <label>Situação</label>
                <select value={situacao} onChange={(e) => setSituacao(e.target.value)} name="situacao">
                    <option value="">Pendente</option>
                    <option value="true">Paga</option>
                </select>
                <label>Descrição:</label>
                <textarea defaultValue={selected?.descricao} required name="descricao"></textarea>
                <label>Data de pagamento:</label>
                <input defaultValue={selected?.dataPagamento.split("T")[0]} required name="data-pagamento" type="date" />
                <div className="column">
                    {erros.map(e => <strong className="error">{e.propriedade}: {e.mensagem}</strong>)}
                </div>
                <div className="row">
                    <button type="submit">Cadastrar</button>
                    <button type="reset" onClick={() => setOpen(false)}>Cancelar</button>
                </div>
            </form>
        </Modal>
    </>)
}

function LinhaDivida({ clientes, divida, onClick }) {
    const data = new Date(divida.dataCadastro);
    const situacao = divida.situacao? "Paga" : "Pendente";
    clientes.sort((a, b) => a.id - b.id)

    return (<tr onClick={onClick}>
        <td>{divida.id}</td>
        <td>{divida.valor}</td>
        <td>{clientes[divida.clienteId-1].nome}</td>
        <td>{situacao.toLocaleString()}</td>
        <td>{new Date(divida.dataPagamento).toLocaleString()}</td>
        <td>{data.toLocaleString()}</td>
    </tr>)
}