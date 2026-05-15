@echo off
echo ========================================
echo    Configurando Hidrocel App
echo ========================================
echo.

:: Verificar si MySQL está instalado
where mysql >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ MySQL no encontrado
    echo Por favor instala MySQL y vuelve a intentar
    pause
    exit
)

:: Pedir contraseña de MySQL
set /p "mysql_pass=Ingresa tu contraseña de MySQL: "

:: Crear base de datos
echo Creando base de datos...
mysql -u root -p%mysql_pass% < setup.sql

if %errorlevel% equ 0 (
    echo ✅ Base de datos creada exitosamente
) else (
    echo ❌ Error al crear la base de datos
    echo Verifica tu contraseña
)

echo.
echo Configuracion completada
echo Ahora ejecuta start.bat
pause