[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ori1I0wD)

# Projeto NoSQL com MongoDB e Node.js

## 🚀 Pré-requisitos

Certifique-se de ter os seguintes itens instalados na sua máquina:

1. **Docker e Docker Compose**: Para executar o MongoDB em contêiner.
2. **Node.js**: Para executar a aplicação.
3. **npm**: Para gerenciar as dependências do Node.js.

## ▶ Execução

### 1️⃣ Subindo o MongoDB com Docker
- Execute o seguinte comando para iniciar o MongoDB em contêiner <br>
```bash
docker-compose up -d
```

### 2️⃣ Configurando e Executando a Aplicação Node.js
- Instale as dependências da aplicação: <br>
```bash 
npm install
```

- Inicie a aplicação:
  - Para modo de produção: ```npm start```
  - Para modo de desenvolvimento: ```npm run dev```

Acesse a aplicação em: http://localhost:3000

## 📚 Rotas da API
Abaixo estão as rotas disponíveis na API e suas respectivas funcionalidades:

### **Usuários**

| Método | Endpoint | Descrição | Parâmetros/Body |
|--------|------------------|-------------------------------------------------|-------------------------------------------------------------|
| `POST` | `/users`         | Cria um novo usuário                            | `{ "name": "string", "age": number }`                       |
| `GET`  | `/users`         | Retorna uma lista de usuários com paginação     | Query params: `query`, `fields`, `limit`, `skip`            |
| `GET`  | `/users/:id`     | Retorna um usuário específico pelo ID           | `:id` é o identificador do usuário                          |
| `PUT`  | `/users/:id`     | Atualiza um usuário específico pelo ID          | `:id` é o identificador do usuário e body com dados a alterar |

---
