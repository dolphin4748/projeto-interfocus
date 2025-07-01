using System.ComponentModel.DataAnnotations;
using ProjetoConsole.Models;
using ProjetoConsole.Repository;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProjetoConsole.Services
{
    public class DividaService
    {
        public DividaService(IRepository repository)
        {
            this.repository = repository;
        }

        private readonly IRepository repository;

        public bool Cadastrar(Divida divida, out List<MensagemErro> mensagens)
        {
            var valido = Validar(divida, out mensagens);
            if (valido)
            {
                try
                {
                    using var transacao = repository.IniciarTransacao();
                    repository.Incluir(divida);
                    repository.Commit();
                    return true;
                }
                catch (Exception)
                {
                    repository.Rollback();
                    return false;
                }
            }
            return false;
        }

        public bool Validar(Divida divida, out List<MensagemErro> mensagens)
        {
            var validationContext = new ValidationContext(divida);
            var erros = new List<ValidationResult>();
            var validation = Validator.TryValidateObject(divida,
                validationContext,
                erros,
                true);
            mensagens = new List<MensagemErro>();

            foreach (var erro in erros)
            {
                var mensagem = new MensagemErro(
                    erro.MemberNames.First(),
                    erro.ErrorMessage);

                mensagens.Add(mensagem);
                Console.WriteLine("{0}: {1}",
                    erro.MemberNames.First(),
                    erro.ErrorMessage);
            }
            //throw new Exception("dados invalidos!!!!");
            return validation;
        }

        public List<Divida> Consultar()
        {
            return repository.Consultar<Divida>()
                .OrderByDescending(c => c.Id)
                .ToList();
        }

        public List<Divida> Consultar(string pesquisa)
        {
            // lambda expression
            var resultado2 = repository
                .Consultar<Divida>()
                .Where(item => item.Descricao.Contains(pesquisa))
                .OrderBy(item => item.Valor)
                .Take(10)
                .ToList();
            return resultado2;
        }

        public List<Divida> ConsultarCliente(long pesquisa)
        {
            // lambda expression
            var resultado2 = repository
                .Consultar<Divida>()
                .Where(item => item.ClienteId == pesquisa)
                .OrderBy(item => item.Valor)
                .Take(10)
                .ToList();
            return resultado2;
        }

        public Divida ConsultarPorCodigo(long id)
        {
            return repository.ConsultarPorId<Divida>(id);
        }

        public Divida Editar(Divida divida)
        {
            var existente = ConsultarPorCodigo(divida.Id);

            if (existente == null)
            {
                return null;
            }
            existente.Valor = divida.Valor;
            existente.Descricao = divida.Descricao;
            try
            {
                using var transacao = repository.IniciarTransacao();
                repository.Salvar(existente);
                repository.Commit();
                return existente;
            }
            catch (Exception)
            {
                repository.Rollback();
                return null;
            }
        }

        public Divida Deletar(int id)
        {
            var existente = ConsultarPorCodigo(id);

            try
            {
                using var transacao = repository.IniciarTransacao();
                repository.Excluir(existente);
                repository.Commit();
                return existente;
            }
            catch (Exception)
            {
                repository.Rollback();
                return null;
            }
        }
    }
}