@echo off
REM Script para iniciar o SustentaAI

echo Verificando a instalacao do Node.js e npm...
npm --version >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js e npm nao encontrados.
    echo Por favor, instale a versao LTS do Node.js a partir de: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js e npm encontrados.
echo.

REM Muda para o diretorio onde o script esta localizado
cd /d "%~dp0"

echo Instalando dependencias do projeto...
echo (Isso pode levar alguns minutos)
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo [ERRO] Falha ao instalar as dependencias.
    echo Verifique sua conexao com a internet ou problemas de proxy.
    pause
    exit /b 1
)

echo Dependencias instaladas com sucesso!
echo.

echo Iniciando o servidor de desenvolvimento...
npm run dev

echo.
echo O servidor foi encerrado.
pause
