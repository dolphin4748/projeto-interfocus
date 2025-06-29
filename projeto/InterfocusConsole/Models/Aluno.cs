using InterfocusConsole.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace InterfocusConsole.Models
{
    public class Aluno : INomeavel, IEntidade
    {
        public long Id { get; set; }
        [Required, MaxLength(50)]
        public string Nome { get; set; }
        public string Email { get; set; }

        [RegularExpression(@"^\d{5}-\d{3}$", 
            ErrorMessage = "O CEP está com formato inválido")]
        public string Cep { get; set; }
        public DateTime? DataNascimento { get; set; }

        public int Idade
        {
            get
            {
                if (!DataNascimento.HasValue)
                {
                    return 0;
                }
                var anoAtual = DateTime.Today.Year;
                var idade = anoAtual - DataNascimento.Value.Year;
                var aniversario = DateTime.Today.AddYears(-idade);
                if (DataNascimento > aniversario) idade--;
                return idade;
            }
        }

        public DateTime DataCadastro { get; private set; }
        = DateTime.Now;

        public virtual string GetPrintMessage()
        {
            // getcodigo e getnome
            return $"{Id} - {Nome}"; // f"" python
        }   
    }
}
