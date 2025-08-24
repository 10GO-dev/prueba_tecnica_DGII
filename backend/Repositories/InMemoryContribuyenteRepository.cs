using PruebaTecnica.DGII.Interfaces;
using PruebaTecnica.DGII.Models;
using System.Collections.Generic;

namespace PruebaTecnica.DGII.Repositories
{
    public class InMemoryContribuyenteRepository : IContribuyenteRepository
    {
        private static readonly List<Contribuyente> _data = new()
        {
            new Contribuyente { RncCedula = "98754321012", Nombre = "JUAN PEREZ", Tipo = "PERSONA FISICA", Estatus = "activo" },
            new Contribuyente { RncCedula = "123456789", Nombre = "FARMACIA TU SALUD", Tipo = "PERSONA JURIDICA", Estatus = "inactivo" }
        };

        public IEnumerable<Contribuyente> GetAll() => _data;

        public Contribuyente? GetByRnc(string rncCedula) => _data.Find(c => c.RncCedula == rncCedula);
    }
}
