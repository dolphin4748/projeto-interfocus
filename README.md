# 🧾 Projeto Interfocus

> Projeto desenvolvido durante o **Bootcamp Interfocus 2025**, com o objetivo de praticar o desenvolvimento full stack utilizando **.NET**, **NHibernate**, **PostgreSQL**, **React** e **Vite**.

---

## 🧠 Descrição

O **Projeto Interfocus** é uma aplicação completa de gerenciamento de **clientes** e **dívidas**.  
O sistema permite cadastrar, editar, excluir e visualizar registros, com associação direta entre clientes e suas dívidas.

A aplicação foi dividida em três partes principais:

- **ProjAPI** → API RESTful em C#/.NET  
- **Projeto-FrontEnd** → Interface web em React e Vite  
- **ProjetoConsole** → Módulo console e estrutura de domínio (entidades, repositórios e serviços)

---

## 🧩 Tecnologias utilizadas

### **Backend (.NET API)**
- C# / .NET
- ASP.NET Core Web API
- NHibernate (ORM)
- PostgreSQL
- Swagger
- Dependency Injection

### **Frontend**
- React
- Vite
- Axios
- React Router DOM
- CSS

### **Outros**
- ESLint
- Git / GitHub

---

## ⚙️ Estrutura do projeto

```
projeto/
├── Projeto.sln
│
├── ProjAPI/                     # API principal (.NET)
│   ├── Controllers/
│   │   ├── ClienteController.cs
│   │   └── DividaController.cs
│   ├── appsettings.json
│   ├── Program.cs
│   └── ProjAPI.csproj
│
├── ProjetoConsole/              # Camada de domínio e persistência
│   ├── Models/
│   │   ├── Cliente.cs
│   │   └── Divida.cs
│   ├── Repository/
│   │   ├── IRepositorio.cs
│   │   └── Implementations/
│   │       ├── RepositoryNHibernate.cs
│   │       └── RepositoryInMemory.cs
│   ├── Services/
│   │   ├── ClienteService.cs
│   │   └── DividaService.cs
│   ├── Mapeamentos/             # Mapeamentos NHibernate
│   │   ├── Cliente.hbm.xml
│   │   └── Divida.hbm.xml
│   ├── Database/
│   │   └── estrutura_inicial.txt
│   └── ProjetoConsole.csproj
│
└── Projeto-FrontEnd/            # Frontend (React + Vite)
    ├── src/
    │   ├── pages/
    │   │   ├── Cliente/
    │   │   ├── Divida/
    │   │   └── Home/
    │   ├── components/
    │   └── services/
    │       ├── clienteService.js
    │       └── dividaService.js
    ├── package.json
    └── vite.config.js
```

---

## 🧾 Funcionalidades

### **Clientes**
- ➕ Cadastrar cliente  
- ✏️ Editar cliente  
- ❌ Excluir cliente  
- 👁️ Listar clientes  

### **Dívidas**
- ➕ Cadastrar dívida associando a um cliente  
- ✏️ Editar dívida  
- ❌ Excluir dívida  
- 👁️ Listar dívidas  

---

## 🚀 Como executar o projeto

### 🖥️ Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---

### ⚙️ Backend — ProjAPI (.NET)

```bash
# Acesse a pasta do backend
cd projeto-interfocus-main/projeto/ProjAPI

# Restaure as dependências
dotnet restore

# Configure o banco de dados em appsettings.json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=projeto;Username=postgres;Password=sua_senha"
}

# Execute a API
dotnet run
```

📡 API rodando em: `https://localhost:5188`  
🧭 Swagger disponível em: `https://localhost:5188/swagger`

---

### 💻 Frontend — Projeto-FrontEnd (React + Vite)

```bash
# Acesse a pasta do frontend
cd projeto-interfocus-main/projeto/Projeto-FrontEnd

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

🌐 Frontend rodando em: `http://localhost:5173`

---
## 🗄️ Banco de Dados

O banco de dados utilizado é **PostgreSQL**.  
As tabelas principais são:

- **cliente**
  - `id`
  - `nome`
  - `cpf`
  - `email`
  - `totaldivida`
  - `datanascimento`
  - `datacadastro`
  - `ativo`

- **divida**
  - `id`
  - `valor`
  - `cliente_id` *(chave estrangeira)*
  - `descricao`
  - `situacao`
  - `datapagamento`
  - `datacadastro`

Os mapeamentos das entidades estão definidos nos arquivos:
```
ProjetoConsole/Mapeamentos/Cliente.hbm.xml
ProjetoConsole/Mapeamentos/Divida.hbm.xml
```
