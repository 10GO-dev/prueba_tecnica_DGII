using System.Linq;
using PruebaTecnica.DGII.Models;

namespace PruebaTecnica.DGII.Data
{
    public static class SeedData
    {
        public static void EnsureSeedData(this PruebaTecnicaContext ctx)
        {
            if (!ctx.Contribuyentes.Any())
            {
                ctx.Contribuyentes.AddRange(
                    new Contribuyente { RncCedula = "98754321012", Nombre = "JUAN PEREZ", Tipo = "PERSONA FISICA", Estatus = "activo" },
                    new Contribuyente { RncCedula = "123456789", Nombre = "FARMACIA TU SALUD", Tipo = "PERSONA JURIDICA", Estatus = "inactivo" }
                );
            }

            if (!ctx.Comprobantes.Any())
            {
                ctx.Comprobantes.AddRange(
                    new ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000001", Monto = 200.00m },
                    new ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000002", Monto = 1000.00m },
                    new ComprobanteFiscal { RncCedula = "123456789", NCF = "E310000000003", Monto = 500.00m }
                );
            }

            ctx.SaveChanges();
        }
    }
}
