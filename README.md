# 🔍 Desafio Técnico: Aspect

## 🎯 Objetivo

Aplicação web para gerenciamento de agendamentos de exames
hospitalares, permitindo que os usuários visualizem exames disponíveis, adicionem
agendamentos e excluam agendamentos existentes.

## 📌 Requisitos Funcionais

### 1. 🗂️ Gerenciamento de Exames

- [x] **Visualizar Exames Disponíveis:**
- [x] Listar todos os tipos de exames disponíveis para agendamento.
- [x] **Detalhes de cada exame:**

- [x] Nome do Exame

- [x] Especialidade médica

### 2. 📅 Agendamento de Exames

- [x] **Adicionar Agendamento:**
- [x] Permitir que usuários agendem um exame selecionando:
- [x] Tipo de exame
- [x] Data e hora disponíveis
- [x] Informações adicionais (observações)

○ **Visualizar Agendamentos:**

- [x] Listar todos os exames agendados.  
       **Detalhes de cada agendamento:**
- ■ Tipo de exame
- ■ Data e hora agendada
- ■ Informações adicionais

○ **Excluir Agendamento:**

- [x] Permitir que usuários removam um agendamento existente.

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
- [x] Acrescentar algum tipo de cache; (THEMA)
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

```

### 3. Abrindo a pasta do projeto no vscode

```bash
  code .

```

### 4. Configurando a DATABASE_URLarquivo (RENOMEIE o arquivo: env.example) para

`.env`

```bash
  DATABASE_URL="postgresql://docker:docker@localhost:5432/aspectexams?schema=public"
```

### 5. Instalando as dependências:

```bash
  npm  install

```

### 6. Executando Prisma Generate:

```bash
  npx prisma migrate generated
```

### 6. Executando as migrações do Prisma:

```bash
  npx prisma migrate dev
```

### 7. Subindo o docker (em terminal/cmd alternativo)

```bash
  docker compose up -d
```

### 8. Iniciando o server:

```bash
  npm run dev
```

## Home

![home](public/image-5.png)

## Novo Exame

![novo exame](public/novoexame.png)

## Listagem de Exames

![list exam](public/image-7.png)

## Detalhes de Exames[id]

![detalhesrouter](public/image-8.png)

## Detalhes de agendamento (inline)

![detalhes inline](public/image-6.png)

## Novo agendamento

![agendamentos](public/novo%20agendamento.png)

## Listagem de agendamentos

![agendamentos](public/image-9.png)

## Detalhes em Listagem de Agendamentos

![Detalhes](public/image-10.png)

## Dark Mode Theme

![Dark Mode](public/image-11.png)
