start cmd /k "cd ..\EcommerceUsingBlazorDotNet\login\Ecommerce && start https://localhost:7042 && dotnet run"

 timeout /t 5
 
start cmd /k "cd ..\EcommerceUsingBlazorDotNet\login\AuthJwtDbApi && dotnet run"

start cmd /k "cd ..\EcommerceUsingBlazorDotNet\login\Auth && dotnet run"

start cmd /k "cd ..\EcommerceUsingBlazorDotNet\product\JwtDbApi && dotnet run"

start cmd /k "cd Vendor && npm start"

start cmd /k "cd Admin && npm start"

