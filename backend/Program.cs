using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica.DGII.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Register EF repositories for production usage
builder.Services.AddScoped<PruebaTecnica.DGII.Interfaces.IContribuyenteRepository, PruebaTecnica.DGII.Repositories.ContribuyenteRepository>();
builder.Services.AddScoped<PruebaTecnica.DGII.Interfaces.IComprobanteRepository, PruebaTecnica.DGII.Repositories.ComprobanteRepository>();
// Services
builder.Services.AddScoped<PruebaTecnica.DGII.Services.ContribuyenteService>();
builder.Services.AddScoped<PruebaTecnica.DGII.Services.ComprobanteService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// EF Core
var connectionString = builder.Configuration.GetConnectionString("Default") ?? "Data Source=prueba_tecnica.db";
builder.Services.AddDbContext<PruebaTecnicaContext>(options => options.UseSqlite(connectionString));

var app = builder.Build();

// Ensure DB created and seeded if using EF Core
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<PruebaTecnicaContext>();
    ctx.Database.EnsureCreated();
    ctx.EnsureSeedData();
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
