
@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ====================================================================
echo   Studio Sustenta AI - Instalador com Correcao de Proxy
echo ====================================================================
echo.

REM Verifica se o npm está instalado
echo [1/5] Verificando instalacao do Node.js e npm...
npm --version >nul 2>nul
if %errorlevel% neq 0 (
    echo.
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

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo    Node.js: %NODE_VERSION%
echo    [AVISO] Versao recomendada: v20.x ou superior
echo.

REM Muda para o diretório do script
cd /d "%~dp0"

echo [2/5] Configurando npm para resolver erro SSL...
echo    - Limpando cache
npm cache clean --force >nul 2>nul

echo    - Removendo configuracoes de proxy antigas
npm config delete proxy >nul 2>nul
npm config delete https-proxy >nul 2>nul

echo    - Configurando registry HTTP (contorna problema SSL)
npm config set registry http://registry.npmjs.org/

echo    - Desabilitando verificacao SSL estrita
npm config set strict-ssl false

echo.
echo [3/5] Tentando instalacao das dependencias...
echo    Metodo 1: npm install com --legacy-peer-deps
echo.

npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo.
    echo [AVISO] Metodo 1 falhou. Tentando metodo alternativo...
    echo    Metodo 2: npm install com configuracoes adicionais
    echo.
    
    npm install --legacy-peer-deps --prefer-offline --no-audit
    
    if %errorlevel% neq 0 (
        echo.
        echo [ERRO] Falha na instalacao!
        echo.
        echo O erro EPROTO geralmente indica:
        echo   - Proxy corporativo bloqueando conexoes
        echo   - Firewall interferindo nas requisicoes
        echo   - Antivirus escaneando trafego HTTPS
        echo.
        echo Solucoes:
        echo   1. Entre em contato com TI para configurar proxy:
        echo      npm config set proxy http://usuario:senha@proxy:porta
        echo      npm config set https-proxy http://usuario:senha@proxy:porta
        echo.
        echo   2. Tente em outra rede (ex: rede domestica/4G)
        echo.
        echo   3. Atualize Node.js para v20.x LTS:
        echo      https://nodejs.org/
        echo.
        echo   4. Use o instalador offline (se disponivel)
        echo.
        pause
        exit /b 1
    )
)

echo.
echo [4/5] Restaurando configuracoes de seguranca...
npm config set strict-ssl true
npm config set registry https://registry.npmjs.org/

echo.
echo [5/5] Verificando instalacao...
if exist "node_modules" (
    echo    [OK] Dependencias instaladas com sucesso!
) else (
    echo    [ERRO] Pasta node_modules nao encontrada
    pause
    exit /b 1
)

echo.
echo ====================================================================
echo   Instalacao concluida!
echo ====================================================================
echo.
echo Deseja iniciar o servidor de desenvolvimento agora? (S/N)
choice /C SN /N /M "Pressione S para Sim ou N para Nao: "

if errorlevel 2 (
    echo.
    echo Para iniciar manualmente, execute: npm run dev
    echo.
    pause
    exit /b 0
)

echo.
echo Iniciando servidor...
echo Pressione Ctrl+C para parar o servidor
echo.
npm run dev

pause
