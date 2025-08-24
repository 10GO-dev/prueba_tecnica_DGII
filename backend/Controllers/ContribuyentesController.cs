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
    }
}
