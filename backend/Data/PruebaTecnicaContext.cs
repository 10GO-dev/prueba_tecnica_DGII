using Microsoft.EntityFrameworkCore;
using PruebaTecnica.DGII.Models;

namespace PruebaTecnica.DGII.Data
{
    public class PruebaTecnicaContext : DbContext
    {
        public PruebaTecnicaContext(DbContextOptions<PruebaTecnicaContext> options) : base(options) { }

        public DbSet<Contribuyente> Contribuyentes { get; set; }
        public DbSet<ComprobanteFiscal> Comprobantes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contribuyente>().HasKey(c => c.RncCedula);
            modelBuilder.Entity<ComprobanteFiscal>().HasKey(c => c.NCF);
            base.OnModelCreating(modelBuilder);
        }
    }
}
