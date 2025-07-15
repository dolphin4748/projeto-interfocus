export default function HomePage() {

    return <>
        <h1>Home</h1>
        <br />
        <div className="container column">
            <h2>Cenario:</h2>
            <br />
            <p>Uma vendinha precisa informatizar o controle de contas de seus clientes (dívidas penduradas) para facilitar a busca e o cadastro desses dados que antes eram feitas por papel.
            O cliente chega na loja, faz a compra e pede para o atendente pendurar para que seja acertado no final do mês.
            Pensando nisso, é necessário criar um sistema simples de cadastro para que o dono da venda consiga controlar as dívidas de seus clientes.</p>
        </div>
        <br />
        <div className="container column">
            <h2>Dados dos clientes:</h2>
            <br />
            <p>. Nome</p>
            <p>. CPF</p>
            <p>. Email</p>
            <p>. Data de nascimento</p>
            <p>. Total em divida</p>
            <p>. Data de cadastro</p>
        </div>
        <br />
        <div className="container column">
            <h2>Dados das dividas:</h2>
            <br />
            <p>. Valor</p>
            <p>. Situação</p>
            <p>. Data de Pagamento</p>
            <p>. Descrição</p>
            <p>. Data de cadastro</p>
        </div>
        <br />
        <div className="container column">
            <h2>Pagina dos clientes:</h2>
            <br />
            <p>. É possivel cadastrar, atualizar, apagar e recuperar clientes</p>
            <p>. Os clientes são ordenados pelo que mais deve para o que menos deve</p>
            <p>. Campo idade é mostrado com base na data de nascimento</p>
            <p>. A lista de clientes é carregada de 9 em 9</p>
            <p>. Há um campo de busca por nome, onde o atendente digita um texto e os clientes cujo nome contém aquele texto são mostrados</p>
            <p>. Há no final da listagem uma soma do total de dívidas dos clientes</p>
        </div>
        <br />
        <div className="container column">
            <h2>Pagina das dividas:</h2>
            <br />
            <p>. É possivel cadastrar, atualizar e apagar dividas</p>
            <p>. É possível marcar uma dívida como paga</p>
            <p>. A soma da dívidas é mostrada ao fim da pagina, sendo de um cliente expecifico ou todas</p>
        </div>
        <br />
        <div className="container column">
            <h2>Pontos Essenciais:</h2>
            <br />
            <p>. Linguagem C#</p>
            <p>. Linguagem Javascript</p>
            <p>. ReactJS</p>
            <p>. Programação orientada a objetos</p>
            <p>. Construção de API</p>
            <p>. Apresentação de informação</p>
            <p>. Qualidade de código</p>
        </div>
    </>
}
