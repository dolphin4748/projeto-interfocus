using ProjetoConsole;
using ProjetoConsole.Models;
using ProjetoConsole.Services;
using Microsoft.AspNetCore.Mvc;

namespace ProjAPI.Controllers
{
    [Route("api/cliente")]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService servico;

        public ClienteController(ClienteService servico)
        {
            this.servico = servico;
        }

        [HttpGet]
        public IActionResult Get(string pesquisa, bool lixeira = false)
        {
            if (lixeira)
            {
                return string.IsNullOrEmpty(pesquisa) ?
                    Ok(servico.ConsultarLixeira()) :
                    Ok(servico.ConsultarLixeira(pesquisa));
            }else {
                return string.IsNullOrEmpty(pesquisa) ?
                    Ok(servico.Consultar()) :
                    Ok(servico.Consultar(pesquisa));
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            if (servico.Cadastrar(cliente, out List<MensagemErro> erros))
            {
                return Ok(cliente);
            }
            return UnprocessableEntity(erros);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Cliente cliente)
        {
            var resultado = servico.Editar(cliente, out List<MensagemErro> erros);
            if (resultado == null)
            {
                return UnprocessableEntity(erros);
            }
            return Ok(resultado);
        }

        [HttpDelete("{codigo}")]
        public IActionResult Delete(long codigo)
        {
            var resultado = servico.Deletar(codigo);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }

        [HttpGet("{codigo}")]
        public IActionResult GetById(long codigo)
        {
            var resultado = servico.ConsultarPorCodigo(codigo);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }
    }
}
