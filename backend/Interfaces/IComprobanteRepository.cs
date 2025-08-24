using PruebaTecnica.DGII.Models;
using System.Collections.Generic;

namespace PruebaTecnica.DGII.Interfaces
{
    public interface IComprobanteRepository
    {
        IEnumerable<ComprobanteFiscal> GetAll();
        IEnumerable<ComprobanteFiscal> GetByRnc(string rncCedula);
    }
}
