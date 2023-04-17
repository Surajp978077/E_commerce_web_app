start cmd /k "cd v1\login\Ecommerce && start https://localhost:7042 && dotnet run"

start cmd /k "cd v1\login\AuthJwtDbApi && dotnet run"

start cmd /k "cd v1\login\Auth && dotnet run"

start cmd /k "cd v1\product\JwtDbApi && dotnet run"

start cmd /k "cd v1\product\ConsumeJwtDbApi && dotnet run"

start cmd /k "cd Vendor && timeout /t 10 && npm start"

start cmd /k "cd Admin && timeout /t 10 && npm start"

