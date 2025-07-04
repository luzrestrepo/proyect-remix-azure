var builder = WebApplication.CreateBuilder(args);

/* // 👇 Agregado para exponer puerto 80
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(80);
});
 */
// Add services to the container.
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

/* app.UseHttpsRedirection(); */

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapGet("/testdb", async () =>
{
    var connectionString = app.Configuration.GetConnectionString("DefaultConnection") 
                           ?? Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");

    using var conn = new Npgsql.NpgsqlConnection(connectionString);
    await conn.OpenAsync();

    // Crear tabla si no existe
    using (var cmd = new Npgsql.NpgsqlCommand("CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name TEXT)", conn))
    {
        await cmd.ExecuteNonQueryAsync();
    }

    // Insertar un dato
    using (var cmd = new Npgsql.NpgsqlCommand("INSERT INTO test_table (name) VALUES ('Hola desde Docker')", conn))
    {
        await cmd.ExecuteNonQueryAsync();
    }

    // Consultar los datos
    using (var cmd = new Npgsql.NpgsqlCommand("SELECT * FROM test_table", conn))
    using (var reader = await cmd.ExecuteReaderAsync())
    {
        var results = new List<object>();
        while (await reader.ReadAsync())
        {
            results.Add(new
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1)
            });
        }
        return Results.Ok(results);
    }
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

