using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace PruebaTecnica.DGII.Middleware
{
    public static class ExceptionHandlerMiddleware
    {
        public static void UseCustomExceptionHandler(this WebApplication app)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var logger = context.RequestServices.GetService<ILogger<Program>>() ?? app.Logger;
                    context.Response.ContentType = "application/problem+json";

                    var exceptionFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
                    var ex = exceptionFeature?.Error;
                    logger.LogError(ex, "Unhandled exception occurred while processing request.");

                    var traceId = System.Diagnostics.Activity.Current?.Id ?? context.TraceIdentifier;

                    var problem = new Microsoft.AspNetCore.Mvc.ProblemDetails
                    {
                        Title = "Error interno",
                        Status = StatusCodes.Status500InternalServerError,
                        Instance = context.Request.Path,
                    };

                    if (app.Environment.IsDevelopment())
                    {
                        problem.Detail = ex?.Message;
                        problem.Extensions["exception"] = ex?.ToString();
                    }

                    problem.Extensions["traceId"] = traceId;

                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(problem));
                });
            });
        }
    }
}
