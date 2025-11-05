@echo off

:: Verifica se o npm está instalado
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ------------------------------------------------------------------
    echo Erro: O Node.js e o npm nao foram encontrados no seu sistema.
    echo Para rodar este projeto, voce precisa instala-los.
    echo.
    echo 1. Acesse https://nodejs.org/ para baixar e instalar a versao LTS.
    echo 2. Apos a instalacao, feche e reabra este terminal/prompt de comando.
    echo 3. Tente executar este script novamente.
    echo ------------------------------------------------------------------
    pause
    exit /b 1
)

echo "Instalando dependencias... Por favor, aguarde."
call npm install

echo.
echo "Dependencias instaladas com sucesso!"
echo.
echo "Iniciando o servidor de desenvolvimento e abrindo o navegador..."
call npm run dev -- --open

pause
