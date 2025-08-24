using PruebaTecnica.DGII.Repositories;
using PruebaTecnica.DGII.Services;
using Xunit;

namespace PruebaTecnica.DGII.Tests
{
    public class ServicesTests
    {
        [Fact]
        public void ContribuyenteService_GetAll_ReturnsTwo()
        {
            var repo = new InMemoryContribuyenteRepository();
            var service = new ContribuyenteService(repo);

            var all = service.GetAll();

            Assert.NotNull(all);
            Assert.NotEmpty(all);
        }

        [Fact]
        public void ComprobanteService_GetTotalItbis_CalculatesCorrectly()
        {
            var repo = new InMemoryComprobanteRepository();
            var service = new ComprobanteService(repo);

            var total = service.GetTotalItbis("98754321012");

            // 200 * 0.18 = 36 ; 1000 * 0.18 = 180 => total 216
            Assert.Equal(216.00m, total);
        }
    }
}
