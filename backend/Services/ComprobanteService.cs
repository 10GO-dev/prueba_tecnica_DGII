using PruebaTecnica.DGII.Interfaces;
using PruebaTecnica.DGII.Models;
using System.Collections.Generic;
using System.Linq;

namespace PruebaTecnica.DGII.Services
{
    public class ComprobanteService
    {
        private readonly IComprobanteRepository _repo;

        public ComprobanteService(IComprobanteRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<ComprobanteFiscal> GetAll() => _repo.GetAll();

        public IEnumerable<ComprobanteFiscal> GetByRnc(string rnc) => _repo.GetByRnc(rnc);

        public decimal GetTotalItbis(string rnc)
        {
            var items = _repo.GetByRnc(rnc);
            if (items == null) return 0m;
            return items.Sum(c => c.Itbis18);
        }

        public void Add(ComprobanteFiscal comprobante)
        {
            _repo.Add(comprobante);
        }
    }
}
