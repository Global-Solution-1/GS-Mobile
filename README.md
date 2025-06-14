# 🔥 FireAway – Aplicativo Mobile

O **FireAway** é o aplicativo mobile da solução desenvolvida para **prevenção, detecção e combate a incêndios florestais**, integrando moradores, 
socorristas e administradores em um ecossistema digital eficiente.

## 📱 Funcionalidades por Perfil

A navegação do app é baseada em um menu lateral (Drawer Navigation), e as telas disponíveis variam de acordo com o **perfil do usuário**, que pode ser:

### 👤 Morador (Usuário)
- `TelaUsuario`: Acesso ao painel do morador
- `TelaListaAvisos`: Lista de avisos e comunicados
- `TelaMensagensADM`: Canal de mensagens com a administração

### 🚨 Socorrista
- `TelaSocorrista`: Painel com tarefas e alertas
- `TelaGerenciamento`: Gerenciamento de ocorrências
- `TelaListaAlertas`: Lista de alertas ativos
- `TelaMensagensADM`: Canal de mensagens com a administração

### 🛠️ Administrador
- `TelaADM`: Painel de administração geral
- `TelaMensagensADM`: Comunicação com os usuários e socorristas
- `TelaInfosUs`: Informações sobre moradores
- `TelaInfosSen`: Informações de sensores

### 🔁 Comum a todos
- `TelaInicial`: Tela de boas-vindas
- `TelaLogin`: Autenticação de acesso
- `TelaCadastroU`: Cadastro de novos moradores
- `TelaEquipe`: Apresentação da equipe responsável

## 🌐 Backend (API Java)

A API REST do projeto foi desenvolvida em **Java (Spring Boot)** e está hospedada no [Render](https://render.com).
Porém, por se tratar de um serviço gratuito, o **deploy pode demorar alguns segundos para responder** após um tempo de inatividade. 
Isso pode afetar ações como **login ou cadastro**, especialmente nas primeiras tentativas.

### ⚠️ Recomendações para Testes

Para evitar lentidão durante os testes, recomendamos clonar e rodar a API localmente:

📦 **Repositório da API Java:**  
👉 [https://github.com/Global-Solution-1/GS-FireAwaySystem.git](https://github.com/Global-Solution-1/GS-FireAwaySystem.git)

🛠️ **URL local de exemplo:**
```js
fetch('http://localhost:8080/usuario/cadastro/morador', {
  method: 'POST',
  ...
});
```

🚫 Em produção, o app está configurado para usar:
```js
https://gs-fireawaysystem.onrender.com
```

## ⚙️ Tecnologias Utilizadas

- **React Native** (com navegação por Drawer)
- **AsyncStorage** para persistência do perfil do usuário
- **Java (Spring Boot)** para a API backend
- **Render** para deploy gratuito da API
- **Estilização customizada** com `StyleSheet`

## 🧭 Estrutura do Projeto

```
/src
 ├── Components
 │   ├── Header.js
 │   └── CustomDrawerContent.js
 ├── Screens
 │   ├── TelaInicial.js
 │   ├── TelaLogin.js
 │   ├── TelaCadastroU.js
 │   ├── TelaADM.js
 │   ├── TelaUsuario.js
 │   ├── TelaSocorrista.js
 │   ├── TelaMensagensADM.js
 │   ├── TelaInfosUs.js
 │   ├── TelaInfosSen.js
 │   ├── TelaListaAvisos.js
 │   ├── TelaListaAlertas.js
 │   ├── TelaGerenciamento.js
 │   └── TelaEquipe.js
```

## 🚀 Como Rodar o Projeto

1. Clone o repositório mobile:
```bash
git clone https://github.com/Global-Solution-1/GS-Mobile.git
cd FireAwayApp
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o app:
```bash
npx expo start
```

4. Certifique-se de que a API esteja rodando localmente ou hospedada e com acesso liberado.

---

## 👥 Grupo Desenvolvedor
- Gabriela de Sousa Reis - RM558830
- Laura Amadeu Soares - RM556690
- Raphael Lamaison Kim - RM557914
