@echo off
REM Define o conjunto de caracteres para UTF-8 para evitar problemas de acentuacao.
chcp 65001 > nul

echo =================================================
echo  Iniciador do Projeto SustentaAI
echo =================================================
echo.

REM Passo 1: Mudar para o diretorio do projeto
echo [1/3] Acessando a pasta do projeto...
cd /d "%~dp0"
echo      Pronto.
echo.

REM Passo 2: Verificar se o Node.js/npm esta instalado
echo [2/3] Verificando a instalacao do Node.js e npm...
npm --version > nul 2> nul
if %errorlevel% neq 0 (
    echo.
    echo      [ERRO] Node.js e npm nao encontrados.
    echo.
    echo      Para rodar o projeto, por favor, instale a versao LTS:
    echo      https://nodejs.org/
    echo.
    echo      Depois da instalacao, feche e abra este terminal e tente novamente.
    echo.
    pause
    exit /b 1
)
echo      Node.js e npm encontrados.
echo.

REM Passo 3: Instalar as dependencias
echo [3/3] Instalando dependencias do projeto. Isso pode levar alguns minutos...
echo      (Usando --legacy-peer-deps para resolver conflitos)
echo.
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo.
    echo      [ERRO] A instalacao das dependencias falhou.
    echo      Verifique a saida de erro acima para mais detalhes.
    echo.
    pause
    exit /b 1
)

echo.
echo =================================================
echo  Dependencias instaladas com sucesso!
echo =================================================
echo.

echo Iniciando o servidor de desenvolvimento...
npm run dev -- --open

echo.
pause
