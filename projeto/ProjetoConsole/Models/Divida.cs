using ProjetoConsole.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace ProjetoConsole.Models
{
    // niveis: iniciante, intermediario e avancado
    public class Divida : IEntidade
    {
        public long Id { get; set; }
        [Required]
        public long Valor { get; set; }
        [Required]
        public string Descricao { get; set; }

        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}