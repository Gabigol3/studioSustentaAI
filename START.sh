#!/bin/bash

echo "Instalando dependencias... Por favor, aguarde."
npm install

echo ""
echo "Dependencias instaladas com sucesso!"
echo ""
echo "Iniciando o servidor de desenvolvimento e abrindo o navegador..."
npm run dev -- --open
