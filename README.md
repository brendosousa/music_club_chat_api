# Documentação da API Music Club Chat

Servidor para o chat da aplicação Music Club Shop. Essa aplicação possui o objeto de permitir a interação em tempo real dos usuários do app Music Club Shop através de mensagens instantâneas.

## Tabela de conteúdos

- [Visão Geral](#1-visão-geral)
- [Eventos](#2-eventos)
- [Realizando eventos](#3-realizando-eventos)

## 1. **Visão Geral**

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Socket.IO](https://socket.io/)

A URL base da aplicação:
https://musicclubchatapi.herokuapp.com/

---

## 2. **Eventos**

A tabela abaixo exibe os eventos que podem ser acessados através do servidor

| Nome do evento  | Descrição                                                          |
| --------------- | ------------------------------------------------------------------ |
| join            | Conecta o usuário a uma sala (room) através de um id               |
| sendMessage     | Envia um objeto com os dados da mensagem para uma sala específica  |
| receivedMessage | Recebe os dados das mensagens de outros usuários conectados à sala |
| getUserOnline   | Retorna os dados de um usuário conectado                           |

---

## 3. **Realizando eventos**

### 3.1. **Conectando a uma sala**

```
socket.emit("join", idRoom);
```

### 3.2. **Enviando uma mensagem a uma sala**

```
socket.emit("sendMessage", {
      idRoom: "1234",
      name: "Joe Doe",
      message: "Hello",
    });
```

### 3.3. **Recebendo mensagens de uma sala**

```
socket.on("receivedMessage", (data) => {
      ...
});
```

### 3.4. **Resgatando usuários online**

```
Ainda não implementado
```
