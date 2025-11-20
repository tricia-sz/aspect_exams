# 🔍 Desafio Técnico: Aspect

## 🎯 Objetivo

Aplicação web para gerenciamento de agendamentos de exames
hospitalares, permitindo que os usuários visualizem exames disponíveis, adicionem
agendamentos e excluam agendamentos existentes.

## 📌 Requisitos Funcionais

### 1. 🗂️ Gerenciamento de Exames

○ **Visualizar Exames Disponíveis:**  
■ Listar todos os tipos de exames disponíveis para agendamento.  
■ **Detalhes de cada exame:**

- ■ Nome do Exame
- ■ Especialidade médica

### 2. 📅 Agendamento de Exames

○ **Adicionar Agendamento:**  
■ Permitir que usuários agendem um exame selecionando:

- ■ Tipo de exame
- ■ Data e hora disponíveis
- ■ Informações adicionais (observações)

○ **Visualizar Agendamentos:**  
■ Listar todos os exames agendados.  
■ **Detalhes de cada agendamento:**

- ■ Tipo de exame
- ■ Data e hora agendada
- ■ Informações adicionais

○ **Excluir Agendamento:**  
■ Permitir que usuários removam um agendamento existente.

---

## 🛠️ Tecnologias a Serem Utilizadas

### 💻 Frontend

- [x] React.js com TypeScript  
       ● Gerenciamento de estado (Redux, Context API ou similar)  
       ● Consumo de APIs RESTful

### 🧩 Backend

● Node.js com TypeScript  
● Frameworks sugeridos: Express.js, Nestjs ou

- [x] similar (NeXt.Js 15)

### 🗄️ Banco de Dados

- [x] SQL (PostgreSQL, MySQL ou similar)  
       ● ORM/Query Builder sugerido: TypeORM, Sequelize, Knex.js ou
- [x] similar (Prisma)

---

## ⭐ Não é obrigatório, mas vamos curtir se você:

- [x] Realizar commits específicos e detalhados;
- [ ] Acrescentar algum tipo de cache;
- [ ] Disponibilizar uma solução para deploy da aplicação (Helm chart, docker-compose
      ou similar);

---

## 🚀 Entrega

- [x] Compartilhar o link do repositório público (GitHub ou similar).  
       ● Assegure-se de que o projeto possa ser executado localmente seguindo as
      instruções do README.  
       ● Opcionalmente, hospede a aplicação em um ambiente online (como Heroku, Vercel,
      Netlify) e forneça o link de acesso.

## 📖 Como Executar o Projeto

### Pré-requisitos

- Node.js (>= 18.x)
- NPM ou Yarn -[x] Banco de dados SQL (PostgreSQL ou MySQL)

### 🦶🏼 Passos a passo de como executar localmente.

### 1. Clone o repositório:Ô

```bash
git clone git@github.com:tricia-sz/aspect_exams.git
```

### 2. Instalando as dependências:

```bash
  cd aspect_exams
  npm install

```

### 3. Configurando o banco de dados no arquivo `.env`:

```bash
  DATABASE_URL="postgresql://docker:docker@localhost:5432/aspectexams?schema=public"

```

### 4. Executando as migrações do Prisma:

```bash
  npx prisma migrate dev
```

### 5. Iniciando o server:

```bash
  npm run dev
```
