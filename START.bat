@echo off
REM Muda para o diretório do script para garantir que os comandos rodem na pasta do projeto
cd /d "%~dp0"

echo Verificando se o Node.js e npm estao instalados...
npm --version >nul 2>nul
if %errorlevel% neq 0 (
    echo ------------------------------------------------------------------
    echo Erro: O Node.js e o npm nao foram encontrados no seu sistema.
    echo Para rodar este projeto, voce precisa instala-los.
    echo.
    echo 1. Acesse https://nodejs.org/ para baixar e instalar a versao LTS.
    echo 2. Apos a instalacao, feche e reabra este terminal.
    echo 3. Tente executar este script novamente.
    echo ------------------------------------------------------------------
    pause
    exit /b
)

echo Instalando dependencias com --legacy-peer-deps... Por favor, aguarde.
npm install --legacy-peer-deps

echo.
echo Dependencias instaladas com sucesso!
echo.
echo Iniciando o servidor de desenvolvimento...
npm run dev -- --open

echo.
echo O servidor foi iniciado. Se a janela do navegador nao abriu, acesse http://localhost:3000
echo.
pause
