# MUDANÇA 1: Usar 'bookworm' em vez de 'bullseye'. 
# O Bookworm (Debian 12) vem com Python 3.11, que suporta o NumPy 2.1
FROM node:18-bookworm-slim

# Instala Python 3, Pip e ferramentas
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1. Instalar dependências do Node.js
COPY package*.json ./
RUN npm install

# 2. Instalar dependências do Simulador (Python)
COPY hestia-sim ./hestia-sim

# MUDANÇA 2: Adicionar '--break-system-packages'
# O Debian 12 protege o python do sistema. Como estamos num container,
# usamos essa flag para forçar a instalação sem precisar criar um ambiente virtual.
RUN cd hestia-sim && pip3 install . --break-system-packages

# 3. Copiar o restante do código
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]