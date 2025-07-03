// See https://aka.ms/new-console-template for more information
using ProjetoConsole.Interfaces;
using ProjetoConsole.Models;

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


