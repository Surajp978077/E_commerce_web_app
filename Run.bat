start cmd /k "cd ..\EcommerceUsingBlazorDotNet\login\Ecommerce && start https://localhost:7042 && dotnet run"

start cmd /k "cd ..\EcommerceUsingBlazorDotNet\login\AuthJwtDbApi && dotnet run"

start cmd /k "cd ..\EcommerceUsingBlazorDotNet\login\Auth && dotnet run"

start cmd /k "cd ..\EcommerceUsingBlazorDotNet\product\JwtDbApi && dotnet run"
..\EcommerceUsingBlazorDotNet
start cmd /k "cd Vendor && timeout /t 10 && npm start"

start cmd /k "cd Admin && timeout /t 10 && npm start"

