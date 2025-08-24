using PruebaTecnica.DGII.Models;
using System.Collections.Generic;

namespace PruebaTecnica.DGII.Interfaces
{
    public interface IContribuyenteRepository
    {
        IEnumerable<Contribuyente> GetAll();
        Contribuyente? GetByRnc(string rncCedula);
    }
}
