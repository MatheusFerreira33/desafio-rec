🚀 Desafio Full Stack – NestJS, GraphQL e Next.js

Este projeto foi desenvolvido como um desafio técnico full stack, com foco em boas práticas de arquitetura, segurança, padronização e deploy em nuvem.

A aplicação é composta por:

Backend em NestJS utilizando GraphQL

Frontend Web em Next.js

Banco de dados PostgreSQL

Ambiente containerizado com Docker

Deploy em nuvem utilizando Render

🧱 Arquitetura do Projeto
/
├── server/        # Backend NestJS (GraphQL + Prisma)
├── web/           # Frontend Next.js
├── docker-compose.yml (apenas para desenvolvimento local)
└── README.md


Cada aplicação possui seu próprio Dockerfile e é deployada como um serviço independente no Render.

🧠 Tecnologias Utilizadas
Backend

NestJS

GraphQL

Prisma ORM

PostgreSQL

JWT (stateless)

Docker

TypeScript

GraphQL Code Generator

ESLint

Bcrypt (hash de senha)

Frontend (Web)

React

Next.js

TypeScript

Tailwind CSS

GraphQL Code Generator

Infra / Deploy

Docker

Render (Web Services + PostgreSQL)
