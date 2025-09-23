# Biblioteca API

## Visão Geral

A **Biblioteca API** é uma API desenvolvida para gerenciamento de uma biblioteca digital, permitindo usuários cadastrarem-se, realizar login, gerenciar livros e reservas.

---

## Funcionalidades

### AuthController

Responsável pelo registro e login de usuários:

- **register**: Cria um novo usuário, valida campos obrigatórios, verifica email duplicado e retorna mensagem de sucesso.
- **login**: Autentica usuário, valida senha, retorna um token acessar endpoints protegidos.

### UserController

- **getAll**: Lista todos os usuários (GET /users) - aberto.
- **getById**: Busca usuário pelo ID (GET /users/:id) - aberto.
- **update**: Atualiza usuário existente (PUT /users/:id) - protegido.
- **delete**: Remove usuário existente (DELETE /users/:id) - protegido.

> Observação: o endpoint de criação de usuário foi substituído pelo **register** da Auth API.

### BookController

- **create**: Cria livro novo (POST /books) - protegido.
- **getAll**: Lista todos os livros (GET /books) - aberto.
- **getById**: Busca livro pelo ID (GET /books/:id) - aberto.
- **update**: Atualiza livro (PUT /books/:id) - protegido.
- **delete**: Remove livro (DELETE /books/:id) - protegido.

### ReservationController

- Gerencia reservas entre usuários e livros, incluindo criação, listagem, atualização e exclusão de reservas.
- Todos os endpoints de escrita protegidos.

### AuthorController / GenreController

- CRUD de autores e gêneros, abertos para leitura.

### Middleware Auth

- **authMiddleware**: Protege endpoints sensíveis.

---

## Testes Automatizados

- **auth.test.ts**: Testa registro e login, valida token JWT.
- **user.test.ts**: Testa listagem de usuários e registro via AuthController.
- **book.test.ts**: Testa criação, listagem e restrição de acesso a livros.

> Todos os testes utilizam **Jest** e **Supertest**.

---

## Endpoints da API

### Auth

| Método | Rota                  | Descrição            |
| ------ | --------------------- | -------------------- |
| POST   | /api/v1/auth/register | Registra um usuário  |
| POST   | /api/v1/auth/login    | Autentica um usuário |

### Users

| Método | Rota              | Protegido |
| ------ | ----------------- | --------- |
| GET    | /api/v1/users     | Não       |
| GET    | /api/v1/users/:id | Não       |
| PUT    | /api/v1/users/:id | Sim       |
| DELETE | /api/v1/users/:id | Sim       |

> Não tem metódo POST (Create) no Usuário, para criar novo usuário usa-se o Register

### Books

| Método | Rota              | Protegido |
| ------ | ----------------- | --------- |
| POST   | /api/v1/books     | Sim       |
| GET    | /api/v1/books     | Não       |
| GET    | /api/v1/books/:id | Não       |
| PUT    | /api/v1/books/:id | Sim       |
| DELETE | /api/v1/books/:id | Sim       |

> Rotas de autores, gêneros e reservas seguem a mesma lógica.

---

## Postman:

### -> Alguns exemplos para usar no Postman

- **Registro:** POST `http://localhost:3001/api/v1/auth/register`
- **Login:** POST `http://localhost:3001/api/v1/auth/login`
- **Listar livros:** GET `http://localhost:3001/api/v1/books`
- **Criar livro (com token):** POST `http://localhost:3001/api/v1/books`

> Para endpoints protegidos, tem que inserir o token no Header.

---

## Testes

> Todos os testes estão implementados em Jest + Supertest, cobrindo autenticação, usuários e livros.
> Os endpoints de leitura e login são abertos.

---

### Desenvolvedor

> Maria Vitória Kuhn - 197960
