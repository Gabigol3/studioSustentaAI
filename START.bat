@echo off
echo "Instalando dependencias... Por favor, aguarde."
call npm install

echo.
echo "Dependencias instaladas com sucesso!"
echo.
echo "Iniciando o servidor de desenvolvimento e abrindo o navegador..."
call npm run dev -- --open

pause
