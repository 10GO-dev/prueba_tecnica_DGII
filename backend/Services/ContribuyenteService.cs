using PruebaTecnica.DGII.Interfaces;
using PruebaTecnica.DGII.Models;
using System.Collections.Generic;

namespace PruebaTecnica.DGII.Services
{
    public class ContribuyenteService
    {
        private readonly IContribuyenteRepository _repo;

        public ContribuyenteService(IContribuyenteRepository repo)
        {
            _repo = repo;
        }

        public IEnumerable<Contribuyente> GetAll() => _repo.GetAll();

        public Contribuyente? GetByRnc(string rnc) => _repo.GetByRnc(rnc);
        
        public void Add(Contribuyente contrib)
        {
            _repo.Add(contrib);
        }
    }
}
