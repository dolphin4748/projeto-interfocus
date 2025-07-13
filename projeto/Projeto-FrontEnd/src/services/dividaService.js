
// PascalCase
// camelCase

var contador = 1;
var currentId = null;

export async function salvarDivida(divida) {
    const resultado = await fetch(`${URL_API}/api/Divida`, {
        method: divida.id ? "PUT" : "POST",
        body: JSON.stringify(divida),
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

const URL_API = "http://localhost:5188";

export function listarDividas(busca, cliente) {
    return fetch(`${URL_API}/api/Divida?busca=${busca || ""}&clienteid=${parseInt(cliente, 10) || 0}`, {
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

export async function getDividaById(id) {
    const resultado = await fetch(`${URL_API}/api/Divida/${id}`, {
        method: "GET"
    });
    var dados = await resultado.json();
    return {
        status: resultado.status,
        data: dados
    }
}

export async function deleteDivida(id) {
    const resultado = await fetch(`${URL_API}/api/Divida/${id}`, {
        method: "DELETE"
    });
    var dados = await resultado.json();
    return {
        status: resultado.status,
        data: dados
    }
}
