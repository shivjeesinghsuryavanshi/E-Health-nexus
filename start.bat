@echo off
echo Starting E-Health Nexus Application...
echo.
echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"
echo.
echo Starting Frontend Server...
timeout /t 3 /nobreak >nul
start cmd /k "cd frontend && npm run dev"
echo.
echo Both servers are starting up. Please wait...
echo.
echo Access the application at: http://localhost:3000
echo.
