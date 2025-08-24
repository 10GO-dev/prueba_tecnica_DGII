using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Repositories
builder.Services.AddSingleton<PruebaTecnica.DGII.Interfaces.IContribuyenteRepository, PruebaTecnica.DGII.Repositories.InMemoryContribuyenteRepository>();
builder.Services.AddSingleton<PruebaTecnica.DGII.Interfaces.IComprobanteRepository, PruebaTecnica.DGII.Repositories.InMemoryComprobanteRepository>();
// Services
builder.Services.AddScoped<PruebaTecnica.DGII.Services.ContribuyenteService>();
builder.Services.AddScoped<PruebaTecnica.DGII.Services.ComprobanteService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
