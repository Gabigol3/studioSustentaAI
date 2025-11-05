#!/bin/bash

# Verifica se o npm está instalado
if ! command -v npm &> /dev/null
then
    echo "------------------------------------------------------------------"
    echo "Erro: O Node.js e o npm não foram encontrados no seu sistema."
    echo "Para rodar este projeto, você precisa instalá-los."
    echo ""
    echo "1. Acesse https://nodejs.org/ para baixar e instalar a versão LTS."
    echo "2. Após a instalação, feche e reabra este terminal."
    echo "3. Tente executar este script novamente."
    echo "------------------------------------------------------------------"
    exit 1
fi

# Muda para o diretório do script para garantir que os comandos rodem na pasta do projeto
cd "$(dirname "$0")"

echo "Instalando dependências... Por favor, aguarde."
npm install --legacy-peer-deps

echo ""
echo "Dependências instaladas com sucesso!"
echo ""
echo "Iniciando o servidor de desenvolvimento e abrindo o navegador..."
npm run dev -- --open