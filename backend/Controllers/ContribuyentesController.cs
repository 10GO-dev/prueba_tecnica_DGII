using Microsoft.AspNetCore.Mvc;
using PruebaTecnica.DGII.Models;
using System.Collections.Generic;

namespace PruebaTecnica.DGII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContribuyentesController : ControllerBase
    {
        // Sample in-memory data for initial feature
        private static readonly List<Contribuyente> _data = new()
        {
            new Contribuyente { RncCedula = "98754321012", Nombre = "JUAN PEREZ", Tipo = "PERSONA FISICA", Estatus = "activo" },
            new Contribuyente { RncCedula = "123456789", Nombre = "FARMACIA TU SALUD", Tipo = "PERSONA JURIDICA", Estatus = "inactivo" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Contribuyente>> Get()
        {
            return Ok(_data);
        }

        [HttpGet("{rncCedula}/comprobantes")]
        public ActionResult GetComprobantes(string rncCedula)
        {
            // Sample comprobantes list (would be moved to repository in a later commit)
            var comprobantes = new List<PruebaTecnica.DGII.Models.ComprobanteFiscal>
            {
                new PruebaTecnica.DGII.Models.ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000001", Monto = 200.00m },
                new PruebaTecnica.DGII.Models.ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000002", Monto = 1000.00m },
                new PruebaTecnica.DGII.Models.ComprobanteFiscal { RncCedula = "123456789", NCF = "E310000000003", Monto = 500.00m }
            };

            var list = comprobantes.Where(c => c.RncCedula == rncCedula).ToList();
            if (!list.Any()) return NotFound(new { message = "Contribuyente no encontrado o sin comprobantes" });

            var totalItbis = Math.Round(list.Sum(x => x.Itbis18), 2);

            return Ok(new { comprobantes = list, totalItbis });
        }
    }
}
