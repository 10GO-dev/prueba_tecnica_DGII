# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PruebaTecnica.DGII.csproj", "./"]
RUN dotnet restore "PruebaTecnica.DGII.csproj"
COPY . .
RUN dotnet publish "PruebaTecnica.DGII.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
EXPOSE 5000
ENTRYPOINT ["dotnet", "PruebaTecnica.DGII.dll"]
