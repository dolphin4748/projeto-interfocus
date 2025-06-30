// See https://aka.ms/new-console-template for more information
using ProjetoConsole;
using ProjetoConsole.Interfaces;
using ProjetoConsole.Models;
using ProjetoConsole.Repository.Implementations;
using ProjetoConsole.Services;

// LINQ - Language Integrated Query

//objeto - instancia de uma classe
var servico =  new ClienteService(new RepositoryInMemory());
var servico2 = new ClienteService(new RepositoryInMemory());
var servico3 = new ClienteService(new RepositoryInMemory());
var servico4 = new ClienteService(new RepositoryInMemory());

// classes diferentes com mesma caracteristica ou comportamento
Metodos.PrintNome(new Cliente());


while (true)
{
    Console.WriteLine("1 - cadastrar");
    Console.WriteLine("2 - listar");
    Console.WriteLine("3 - pesquisar");
    Console.Write("Opção: ");
    var opcao = LerInteiro();

    switch (opcao)
    {
        case 1:
            Console.Write("Nome: ");
            var nome = Console.ReadLine();
            Console.Write("Código: ");
            var codigo = LerInteiro();

            Console.Write("Desconto: ");
            var desconto = double.Parse(Console.ReadLine());

            var cliente = new Cliente()
            {
                Nome = nome,
                Id = codigo
            };

            if (servico.Cadastrar(cliente, out _))
            {
                Console.WriteLine("Cliente cadastrado com sucesso!");
            }
            else
            {
                Console.WriteLine("Dados inválidos para cadastrar cliente");
            }
            break;
        case 2:
            Metodos.PrintarLista(servico4.Consultar(), "Cliente: ");
            break;
        case 3: // label
            var pesquisa = Console.ReadLine();
            var resultado = servico2.Consultar(pesquisa);
            Metodos.PrintarLista(resultado, true);
            break;
        case 4:
            Console.Write("Código: ");
            var codigoBusca = LerInteiro();

            var clientePesquisado = servico3.ConsultarPorCodigo(codigoBusca);

            if (clientePesquisado == null)
            {
                Console.WriteLine("Cliente não encontrado");
            }
            else
            {
                Console.Write("Nome: ");
                var novoNome = Console.ReadLine();
                //setnome
                var oldNome = clientePesquisado.Nome;
                clientePesquisado.Nome = novoNome;
                if (!ClienteService.Validar(clientePesquisado, out _))
                {
                    clientePesquisado.Nome = oldNome;
                }
                //clientePesquisado.DataCadastro = DateTime.Now;
                Console.WriteLine(clientePesquisado.DataCadastro);
            }
            break;
    }
}

static int LerInteiro()
{
    try
    {
        var inteiro = Console.ReadLine();
        return int.Parse(inteiro);
    }
    catch (FormatException ex)
    {
        Console.WriteLine("Texto inválido!");
        return 0;
    }
    //var inteiro = Console.ReadLine();
    //return int.TryParse(inteiro, out int valor) ? valor : 0;
}

class Metodos
{
    public static void PrintarLista(List<Cliente> lista, string prefix = "")
    {
        foreach (var item in lista)
        {
            Console.WriteLine(prefix + item.GetPrintMessage());
        }
    }

    public static void PrintarLista(List<Cliente> clientes, bool header)
    {
        Console.WriteLine("codigo - nome - desconto");
        PrintarLista(clientes);
    }

    public static void PrintNome(INomeavel objeto)
    {
        Console.WriteLine(objeto.Nome);
    }
}


