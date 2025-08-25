using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica.DGII.Data;
using PruebaTecnica.DGII.Repositories;
using PruebaTecnica.DGII.Interfaces;
using PruebaTecnica.DGII.Services;
using PruebaTecnica.DGII.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Register EF repositories for production usage
builder.Services.AddScoped<IContribuyenteRepository, ContribuyenteRepository>();
builder.Services.AddScoped<IComprobanteRepository, ComprobanteRepository>();
// Services
builder.Services.AddScoped<ContribuyenteService>();
builder.Services.AddScoped<ComprobanteService>();
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
    await ctx.Database.EnsureCreatedAsync();
    ctx.EnsureSeedData();
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Expose swagger in all environments for easier local testing and QA.
app.UseSwagger();
app.UseSwaggerUI();

// Use centralized exception handler from Middleware
app.UseCustomExceptionHandler();

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
