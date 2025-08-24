using System.Collections.Generic;
using System.Linq;
using PruebaTecnica.DGII.Interfaces;
using PruebaTecnica.DGII.Models;
using PruebaTecnica.DGII.Data;

namespace PruebaTecnica.DGII.Repositories
{
    public class ContribuyenteRepository : IContribuyenteRepository
    {
        private readonly PruebaTecnicaContext _context;
        public ContribuyenteRepository(PruebaTecnicaContext context) => _context = context;

        public IEnumerable<Contribuyente> GetAll() => _context.Contribuyentes.ToList();

        public Contribuyente? GetByRnc(string rncCedula) => _context.Contribuyentes.Find(rncCedula);
    }
}
