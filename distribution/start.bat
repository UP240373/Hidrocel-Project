@echo off
title Hidrocel App
echo ========================================
echo    Iniciando Hidrocel App
echo ========================================

:: Verificar archivo .env
if not exist .env (
    echo ❌ No se encuentra .env
    echo Crea el archivo .env con tus credenciales
    pause
    exit
)

:: Verificar MySQL (opcional)
echo 🔍 Verificando MySQL...

:: Iniciar la app
echo 🚀 Iniciando servidor...
start /B hidrocel-app.exe

timeout /t 3 /nobreak > nul
start http://localhost:3000

echo ✅ Servidor iniciado
echo 🌐 Abriendo navegador
pause