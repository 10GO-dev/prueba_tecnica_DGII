using PruebaTecnica.DGII.Interfaces;
using PruebaTecnica.DGII.Models;
using System.Collections.Generic;

namespace PruebaTecnica.DGII.Repositories
{
    public class InMemoryComprobanteRepository : IComprobanteRepository
    {
        private static readonly List<ComprobanteFiscal> _comprobantes = new()
        {
            new ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000001", Monto = 200.00m },
            new ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000002", Monto = 1000.00m },
            new ComprobanteFiscal { RncCedula = "123456789", NCF = "E310000000003", Monto = 500.00m }
        };

        public IEnumerable<ComprobanteFiscal> GetAll() => _comprobantes;

        public IEnumerable<ComprobanteFiscal> GetByRnc(string rncCedula) => _comprobantes.FindAll(c => c.RncCedula == rncCedula);
    }
}
