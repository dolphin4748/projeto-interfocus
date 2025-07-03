using ProjetoConsole.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace ProjetoConsole.Models
{
    // niveis: iniciante, intermediario e avancado
    public class Divida : IEntidade
    {
        public long Id { get; set; }
        [Required]
        public float Valor { get; set; }
        [Required]
        public long ClienteId { get; set; }
        [Required]
        public string Descricao { get; set; }

        public DateTime DataPagamento { get; set; } = DateTime.Now;
        [Required]

        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}