using ProjetoConsole;
using ProjetoConsole.Models;
using ProjetoConsole.Services;
using Microsoft.AspNetCore.Mvc;

namespace ProjAPI.Controllers
{
    [Route("api/[controller]")]
    public class DividaController : ControllerBase
    {
        private readonly DividaService servico;

        public DividaController(DividaService servico)
        {
            this.servico = servico;
        }

        [HttpGet]
        public IActionResult Get(string busca, long clienteid = 0)
        {
            if (string.IsNullOrEmpty(busca))
            {
                if (clienteid > 0)
                {
                    var Divida = servico.ConsultarCliente(clienteid);
                    if (Divida == null)
                    {
                        return NotFound();
                    }
                    return Ok(Divida);
                }
                return Ok(servico.Consultar());
            }
            if (clienteid > 0)
            {
                var Divida = servico.ConsultarCliente(clienteid, busca);
                if (Divida == null)
                {
                    return NotFound();
                }
                return Ok(Divida);
            }
            return Ok(servico.Consultar(busca));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Divida Divida)
        {
            // DividaService, DividaBusiness
            // controllers: camada de acesso
            // services: camada de negócio
            // repositories: camada de dados
            if (servico.Cadastrar(Divida, out List<MensagemErro> erros))
            {
                return Ok(Divida);
            }
            return UnprocessableEntity(erros);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Divida Divida)
        {
            var resultado = servico.Editar(Divida);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }

        [HttpDelete("{codigo}")]
        public IActionResult Delete(int codigo)
        {
            var resultado = servico.Deletar(codigo);
            if (resultado == null)
            {
                return NotFound();
            }
            return Ok(resultado);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(long id)
        {
            var Divida = servico.ConsultarPorCodigo(id);
            if (Divida == null)
            {
                return NotFound();
            }
            return Ok(Divida);
        }
    }
}