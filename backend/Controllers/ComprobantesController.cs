using Microsoft.AspNetCore.Mvc;
using PruebaTecnica.DGII.Models;
using PruebaTecnica.DGII.Services;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System;

namespace PruebaTecnica.DGII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComprobantesController : ControllerBase
    {
        private readonly ComprobanteService _service;
        private readonly ILogger<ComprobantesController> _logger;

        public ComprobantesController(ComprobanteService service, ILogger<ComprobantesController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ComprobanteFiscal>> Get()
        {
            try
            {
                var data = _service.GetAll();
                return Ok(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving comprobantes");
                return StatusCode(500, new { message = "Error interno" });
            }
        }
        [HttpPost]
        public ActionResult Create([FromBody] ComprobanteFiscal comprobante)
        {
            try
            {
                if (comprobante == null) return BadRequest(new { message = "Payload inválido" });

                if (string.IsNullOrWhiteSpace(comprobante.NCF) || string.IsNullOrWhiteSpace(comprobante.RncCedula))
                    return BadRequest(new { message = "NCF y RncCedula son requeridos" });

                // ensure contribuyente exists
                var contrib = HttpContext.RequestServices.GetService(typeof(PruebaTecnica.DGII.Services.ContribuyenteService)) as PruebaTecnica.DGII.Services.ContribuyenteService;
                if (contrib == null) return StatusCode(500, new { message = "Service unavailable" });

                var contribExists = contrib.GetByRnc(comprobante.RncCedula);
                if (contribExists == null) return NotFound(new { message = "Contribuyente no encontrado" });

                // ensure unique NCF
                var existing = _service.GetAll();
                if (existing != null && System.Linq.Enumerable.Any(existing, c => c.NCF == comprobante.NCF))
                    return Conflict(new { message = "Comprobante con mismo NCF ya existe" });

                _service.Add(comprobante);
                return CreatedAtAction(nameof(Get), null, comprobante);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating comprobante");
                return StatusCode(500, new { message = "Error interno" });
            }
        }
    }
}
