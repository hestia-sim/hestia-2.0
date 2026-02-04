# 🧠 HESTIA - Back-End

---

## 🇧🇷 Documentação - Português

### 📌 Visão Geral

Este repositório contém o back-end da aplicação HESTIA 2.0. O **HESTIA 2.0** foi desenvolvida com o objetivo de facilitar a **criação de casos de teste** para o sistema original HESTIA. Devido ao grande volume de dados envolvidos, esse processo tornou-se desafiador. Este projeto visa **simplificar e agilizar** essa etapa, permitindo a geração de exemplos representativos de maneira mais eficiente e acessível.

---

### ⚙️ Requisitos

- Docker e Docker Compose instalados
- Node.js instalado (versão 16+ recomendada)
- Python/Pip
- [Repositório do front-end clonado](https://github.com/ArturMota19/hestia-frontend)

---

### 🛠️ Instalação com Docker Compose

1. Clone o repositório:
   ```bash
   git clone https://github.com/ArturMota19/hestia-backend.git
   cd hestia-backend
   ```

2. Crie o .env na raiz do projeto:
   ```
    DB_NAME=hestia
    DB_USER=root
    DB_PASSWORD=password
    DB_HOST=mysql
    PORT=3000
    JWT_SECRET="StringAleatoria"
    ADMIN_NAME="nome"
    ADMIN_EMAIL="email@email.com"
    ADMIN_PASSWORD="senha"
   ```

3. Inicie os serviços:
   ```bash
   docker-compose up -d
   ```

---

## 🇺🇸 Documentation - English

### 📌 Overview

This repository contains the back-end of the HESTIA 2.0 application. The **HESTIA 2.0** was developed to facilitate the **creation of test cases** for the original HESTIA system. Due to the large volume of data involved, this process became challenging. This project aims to **simplify and speed up** this step, allowing the generation of representative examples in a more efficient and accessible way.

---

### ⚙️ Requirements

- Docker and Docker Compose installed
- Node.js installed (version 16+ recommended)
- Python/Pip
- [Front-end repository cloned](https://github.com/ArturMota19/hestia-frontend)

---

### 🛠️ Installation with Docker Compose

1. Clone the repository:
    ```bash
    git clone https://github.com/ArturMota19/hestia-backend.git
    cd hestia-backend
    ```

2. Create the .env file at the project root:
    ```
     DB_NAME=hestia
     DB_USER=root
     DB_PASSWORD=password
     DB_HOST=mysql
     PORT=3000
     JWT_SECRET="RandomString"
     ADMIN_NAME="name"
     ADMIN_EMAIL="email@email.com"
     ADMIN_PASSWORD="password"
    ```

3. Start the services:
    ```bash
    docker-compose up -d
    ```
