@echo off
REM Verifica se o npm está instalado
npm --version >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] Node.js/npm nao encontrado!
    echo.
    echo Para resolver:
    echo   1. Acesse: https://nodejs.org/
    echo   2. Baixe e instale a versao LTS (v20.x ou superior)
    echo   3. Reinicie este terminal
    echo   4. Execute este script novamente
    echo.
    pause
    exit /b 1
)

echo Instalando dependencias... Por favor, aguarde.
REM Configura o npm para usar http temporariamente para contornar proxies
npm config set registry http://registry.npmjs.org/
npm install --legacy-peer-deps

REM Restaura a configuração original do npm
npm config set registry https://registry.npmjs.org/

echo.
echo Dependencias instaladas com sucesso!
echo.
echo Iniciando o servidor de desenvolvimento e abrindo o navegador...

REM Corrige possiveis erros de SSL ao chamar a API da IA
set NODE_TLS_REJECT_UNAUTHORIZED=0

npm run dev -- --open

echo.
echo O servidor foi iniciado. Esta janela pode ser fechada.
pause
