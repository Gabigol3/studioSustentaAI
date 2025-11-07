@echo off
echo ====================================================================
echo   Studio Sustenta AI - Instalador
echo ====================================================================
echo.

REM Verifica se o npm está instalado
echo Verificando instalacao do Node.js e npm...
npm --version >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Node.js e npm nao encontrados. Por favor, instale a versao LTS a partir de https://nodejs.org/ e tente novamente.
    echo.
    pause
    exit /b 1
)
echo Node.js e npm encontrados.
echo.

REM Muda para o diretório do script
cd /d "%~dp0"

echo Instalando dependencias do projeto... (Isso pode levar alguns minutos)
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha na instalacao das dependencias. O erro pode ser relacionado a proxy ou firewall.
    echo Por favor, verifique sua conexao e tente executar o START.bat novamente.
    echo.
    pause
    exit /b 1
)

echo.
echo Dependencias instaladas com sucesso!
echo.
echo Iniciando o servidor de desenvolvimento e abrindo o navegador...
echo Pressione Ctrl+C no terminal para parar o servidor.

npm run dev -- --open

echo.
echo Servidor finalizado.
pause
