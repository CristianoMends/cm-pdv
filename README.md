# CM PDV

O **CM PDV** é um sistema de **Ponto de Venda (PDV)** desenvolvido para gerenciar vendas e produtos em um ambiente comercial. Nesta versão inicial, o sistema permite o **registro de vendas e produtos**, além de possibilitar a visualização de **relatórios de vendas por gráficos**. O objetivo é facilitar o processo de vendas e a análise de desempenho da loja.

## Funcionalidades

- **Cadastro de Produtos**: Cadastro de produtos com nome, descrição, preço e quantidade em estoque.
- **Registro de Vendas**: Realiza o registro de vendas, atualizando o estoque automaticamente.
- **Relatórios de Vendas**: Exibe gráficos interativos com dados de vendas por período (diário, semanal, mensal).
- **Controle de Estoque**: Atualiza o estoque dos produtos automaticamente após a realização das vendas.
- **Autenticação e Autorização**: Sistema de login para garantir que apenas usuários autorizados acessem o sistema.

## Tecnologias Utilizadas

- **Frontend**: Angular 17
- **Backend**: Java 21 com Spring Boot
- **Banco de Dados**: PostgreSQL
- **Gerenciamento de Dependências**: Gradle
- **Containerização**: Docker e Docker Compose
- **Infraestrutura**: Google Cloud Platform (GCP)

## Pré-requisitos

Antes de rodar o projeto, é necessário ter as seguintes ferramentas instaladas:

- [Java 21](https://adoptium.net/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Gradle](https://gradle.org/)
- [PostgreSQL](https://www.postgresql.org/)
