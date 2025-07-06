import { useEffect, useState } from "react"
import { getDividaById, listarDividas, salvarDivida } from "../../services/dividaService";
import Modal from "../../components/Modal";
import { useRouter } from "simple-react-routing"

export default function DividaPage() {

    const [dividas, setDividas] = useState([]);

    const { pathParams } = useRouter();

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState(null);

    const [situacao, setSituacao] = useState("");

    const params = new URLSearchParams(window.location.search);

    const [erros, setErros] = useState([]);

    const [search, setSearch] = useState(params.get("q"));

    const [cliente, setCliente] = useState(params.get("q"));

    const fetchData = async () => {
        const resultado = await listarDividas(search, cliente);
        if (resultado.status == 200) {
            setDividas(resultado.data);
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
        if (pathParams["id"]) {
            selecionarLinha({ id: pathParams["id"] })
        }
    }, [])

    useEffect(() => {
        if (selected) {
            setSituacao(selected.situacao ? "true" : "");
        }
    }, [selected]);


    useEffect(() => {
        fetchData();
    }, [search, cliente]);

    useEffect(() => {
        var timeout = setTimeout(() => {
            fetchData();
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
        <h1>DIVIDAS: {search}{cliente}</h1>

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
            <input name="cliente"
                type="search"
                value={cliente}
                onChange={(e) =>
                    setCliente(e.target.value)
                }
            />
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
                    dividas.map(divida =>
                        <LinhaDivida key={divida.id}
                            divida={divida}
                            onClick={() => selecionarLinha(divida)}></LinhaDivida>
                    )
                }
            </tbody>
        </table>

        <Modal open={open}>
            <form method="post" onSubmit={submitForm}>
                <label>Valor:</label>
                <input defaultValue={selected?.valor} required type="number" name="valor"/>
                <label>Cliente:</label>
                <input defaultValue={selected?.clienteId} required type="number" name="cliente"/>
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

function LinhaDivida({ divida, onClick }) {
    const data = new Date(divida.dataCadastro);
    const situacao = divida.situacao? "Paga" : "Pendente";

    return (<tr onClick={onClick}>
        <td>{divida.id}</td>
        <td>{divida.valor}</td>
        <td>{divida.clienteId}</td>
        <td>{situacao.toLocaleString()}</td>
        <td>{new Date(divida.dataPagamento).toLocaleString()}</td>
        <td>{data.toLocaleString()}</td>
    </tr>)
}