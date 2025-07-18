﻿using System.ComponentModel.DataAnnotations;
using ProjetoConsole.Models;
using ProjetoConsole.Repository;

namespace ProjetoConsole.Services
{
    public class ClienteService
    {
        private readonly IRepository repository;

        public ClienteService(IRepository repository)
        {
            this.repository = repository;
        }

        public bool Cadastrar(Cliente cliente, out List<MensagemErro> mensagens)
        {
            var valido = Validar(cliente, out mensagens);
            if (valido)
            {
                try
                {
                    using var transacao = repository.IniciarTransacao();
                    repository.Incluir(cliente);
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

        public static bool Validar(Cliente cliente, out List<MensagemErro> mensagens)
        {
            var validationContext = new ValidationContext(cliente);
            var erros = new List<ValidationResult>();
            var validation = Validator.TryValidateObject(cliente,
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

            if (cliente.Idade < 16)
            {
                mensagens.Add(new MensagemErro("dataNascimento", "Cliente deve ser maior de 16 anos"));
                validation = false;
            }

            //throw new Exception("dados invalidos!!!!");
            return validation;
        }

        public List<Cliente> Consultar()
        {
            var resultado = repository
                .Consultar<Cliente>()
                .Where(item => item.Ativo)
                .OrderByDescending(item => item.TotalDivida)
                .ToList();
            return resultado;
        }

        public List<Cliente> Consultar(string pesquisa)
        {
            // lambda expression - LINQ
            var resultado = repository
                .Consultar<Cliente>()
                .Where(item => item.Nome.Contains(pesquisa) && item.Ativo)
                .OrderByDescending(item => item.TotalDivida)
                .ToList();
            return resultado;
        }

        public List<Cliente> ConsultarLixeira(string pesquisa = "")
        {
            // lambda expression - LINQ
            var resultado = repository
                .Consultar<Cliente>()
                .Where(item => item.Nome.Contains(pesquisa) && item.Ativo == false)
                .OrderByDescending(item => item.TotalDivida)
                .ToList();
            return resultado;
        }

        public Cliente ConsultarPorCodigo(long codigo)
        {
            return repository.ConsultarPorId<Cliente>(codigo);
        }

        public Cliente Editar(Cliente cliente, out List<MensagemErro> mensagens)
        {
            var existente = ConsultarPorCodigo(cliente.Id);

            if (existente == null)
            {
                mensagens = null;
                return null;
            }
            existente.Nome = cliente.Nome;
            existente.Email = cliente.Email;
            existente.Cpf = cliente.Cpf;
            existente.DataNascimento = cliente.DataNascimento;
            existente.Ativo = cliente.Ativo;

            var valido = Validar(cliente, out mensagens);
            if (valido)
            {
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
            return null;
        }

        public Cliente Deletar(long codigo)
        {
            var existente = ConsultarPorCodigo(codigo);
            try
            {
                if (existente.Ativo)
                {
                    existente.Ativo = false;
                    return Editar(existente, out _);
                }
                else
                {
                    using var transacao = repository.IniciarTransacao();
                    repository.Excluir(existente);
                    repository.Commit();
                    return existente;
                }
            }
            catch (Exception)
            {
                repository.Rollback();
                return null;
            }
        }
    }
}
