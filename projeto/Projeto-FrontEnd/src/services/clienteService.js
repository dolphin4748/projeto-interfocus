const URL_API = "http://localhost:5188";

export async function salvarCliente(cliente) {
    const resultado = await fetch(`${URL_API}/api/cliente`, {
        method: cliente.id ? "PUT" : "POST",
        body: JSON.stringify(cliente),
        headers: {
            "Content-type": "application/json"
        }
    });
    var dados = await resultado.json();
    return {
        status: resultado.status,
        data: dados
    }
}

export function listarClientes(busca, lixeira = false) {
    return fetch(`${URL_API}/api/cliente?pesquisa=${busca || ""}&lixeira=${lixeira}`, {
        method: "GET"
    }).then(async resultado => {
        if (resultado.status === 200) {
            const data = await resultado.json();
            return {
                status: resultado.status,
                data: data
            }
        }
        return {
            status: resultado.status,
            data: null
        }
    })
}

export async function getClienteById(id) {
    const resultado = await fetch(`${URL_API}/api/cliente/${id}`, {
        method: "GET"
    });
    var dados = await resultado.json();
    return {
        status: resultado.status,
        data: dados
    }
}
