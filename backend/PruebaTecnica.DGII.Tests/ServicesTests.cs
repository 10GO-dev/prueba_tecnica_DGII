using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica.DGII.Data;
using PruebaTecnica.DGII.Repositories;
using PruebaTecnica.DGII.Services;
using PruebaTecnica.DGII.Models;
using Xunit;

namespace PruebaTecnica.DGII.Tests
{
    public class ServicesTests
    {
        private PruebaTecnicaContext CreateInMemoryContext()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            var options = new DbContextOptionsBuilder<PruebaTecnicaContext>()
                .UseSqlite(connection)
                .Options;

            var ctx = new PruebaTecnicaContext(options);
            ctx.Database.EnsureCreated();

            // seed
            ctx.Contribuyentes.AddRange(
                new Contribuyente { RncCedula = "98754321012", Nombre = "JUAN PEREZ", Tipo = "PERSONA FISICA", Estatus = "activo" },
                new Contribuyente { RncCedula = "123456789", Nombre = "FARMACIA TU SALUD", Tipo = "PERSONA JURIDICA", Estatus = "inactivo" }
            );
            ctx.Comprobantes.AddRange(
                new ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000001", Monto = 200.00m },
                new ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000002", Monto = 1000.00m },
                new ComprobanteFiscal { RncCedula = "123456789", NCF = "E310000000003", Monto = 500.00m }
            );
            ctx.SaveChanges();

            return ctx;
        }

        [Fact]
        public void ContribuyenteService_GetAll_ReturnsNotEmpty()
        {
            using var ctx = CreateInMemoryContext();
            var repo = new ContribuyenteRepository(ctx);
            var service = new ContribuyenteService(repo);

            var all = service.GetAll();

            Assert.NotNull(all);
            Assert.NotEmpty(all);
        }

        [Fact]
        public void ContribuyenteService_GetByRnc_ReturnsExpected()
        {
            using var ctx = CreateInMemoryContext();
            var repo = new ContribuyenteRepository(ctx);
            var service = new ContribuyenteService(repo);

            var c = service.GetByRnc("98754321012");
            Assert.NotNull(c);
            Assert.Equal("JUAN PEREZ", c.Nombre);
        }

        [Fact]
        public void ContribuyenteService_Add_CreatesContribuyente()
        {
            using var ctx = CreateInMemoryContext();
            var repo = new ContribuyenteRepository(ctx);
            var service = new ContribuyenteService(repo);

            var newC = new Contribuyente { RncCedula = "555000111", Nombre = "TEST S R L", Tipo = "PERSONA_JURIDICA", Estatus = "activo" };
            service.Add(newC);

            var found = ctx.Contribuyentes.Find("555000111");
            Assert.NotNull(found);
            Assert.Equal("TEST S R L", found.Nombre);
        }

        [Fact]
        public void ComprobanteService_GetTotalItbis_CalculatesCorrectly()
        {
            using var ctx = CreateInMemoryContext();
            var repo = new ComprobanteRepository(ctx);
            var service = new ComprobanteService(repo);

            var total = service.GetTotalItbis("98754321012");

            // 200 * 0.18 = 36 ; 1000 * 0.18 = 180 => total 216
            Assert.Equal(216.00m, total);
        }

        [Fact]
        public void ComprobanteService_Add_PersistsAndAffectsTotals()
        {
            using var ctx = CreateInMemoryContext();
            var repo = new ComprobanteRepository(ctx);
            var service = new ComprobanteService(repo);

            var before = service.GetTotalItbis("98754321012");
            service.Add(new ComprobanteFiscal { RncCedula = "98754321012", NCF = "E310000000009", Monto = 100m });
            var after = service.GetTotalItbis("98754321012");

            Assert.True(after > before);
            Assert.Equal(before + (100m * 0.18m), after);
        }
    }
}
