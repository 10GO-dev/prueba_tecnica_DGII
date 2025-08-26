using Microsoft.AspNetCore.Mvc;
using PruebaTecnica.DGII.Models;
using PruebaTecnica.DGII.Services;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System;

namespace PruebaTecnica.DGII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContribuyentesController : ControllerBase
    {
        private readonly ContribuyenteService _service;
        private readonly ComprobanteService _comprobanteService;
        private readonly ILogger<ContribuyentesController> _logger;

        public ContribuyentesController(ContribuyenteService service, ComprobanteService comprobanteService, ILogger<ContribuyentesController> logger)
        {
            _service = service;
            _comprobanteService = comprobanteService;
            _logger = logger;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Contribuyente>> Get()
        {
            try
            {
                var data = _service.GetAll();
                return Ok(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contribuyentes");
                return StatusCode(500, new { message = "Error interno" });
            }
        }

        [HttpGet("{rncCedula}/comprobantes")]
        public ActionResult GetComprobantes(string rncCedula)
        {
            try
            {
                var contrib = _service.GetByRnc(rncCedula);
                if (contrib == null) return NotFound(new { message = "Contribuyente no encontrado" });

                var list = _comprobanteService.GetByRnc(rncCedula).ToList();
                var totalItbis = Math.Round(list.Sum(x => x.Itbis18), 2);

                return Ok(new { contribuyente = contrib, comprobantes = list, totalItbis });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving comprobantes for {rnc}", rncCedula);
                return StatusCode(500, new { message = "Error interno" });
            }
        }
    }
}
