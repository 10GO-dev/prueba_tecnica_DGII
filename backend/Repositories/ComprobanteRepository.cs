using System.Collections.Generic;
using System.Linq;
using PruebaTecnica.DGII.Interfaces;
using PruebaTecnica.DGII.Models;
using PruebaTecnica.DGII.Data;

namespace PruebaTecnica.DGII.Repositories
{
    public class ComprobanteRepository : IComprobanteRepository
    {
        private readonly PruebaTecnicaContext _context;
        public ComprobanteRepository(PruebaTecnicaContext context) => _context = context;

        public IEnumerable<ComprobanteFiscal> GetAll() => _context.Comprobantes.ToList();

        public IEnumerable<ComprobanteFiscal> GetByRnc(string rncCedula)
        {
            return _context.Comprobantes.Where(c => c.RncCedula == rncCedula).ToList();
        }
    }
}
