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
    }
}
