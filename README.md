# Projeto Final CEPEDI

Este é um projeto que conecta uma API de vagas ao frontend. Siga as instruções abaixo para configurar e executar o projeto.

## Pré-requisitos

- **Node.js**: Certifique-se de que a versão mais atual esteja instalada em sua máquina.

## Passo a Passo para Configuração

1. **Clone o repositório**  
   Primeiro, baixe o código fonte para sua máquina:  
   ```bash
   git clone https://github.com/AlbertoLucass/projeto-final-cepedi.git
   ```

2. **Acesse o diretório do projeto**  
   Navegue até a pasta principal do projeto:
   ```bash
   cd projeto-final-cepedi/
   ```

3. **Instale as dependências da API**  
   Acesse a pasta da API e instale as bibliotecas necessárias:
   ```bash
   cd api-express/
   npm install
   ```

4. **Instale as dependências do frontend**  
   Retorne ao diretório principal e acesse a pasta do frontend para instalar suas dependências:
   ```bash
   cd ../vagas-front/
   npm install
   ```

## Como Executar o Projeto

Abra **dois terminais** e siga os passos abaixo:

### Terminal 1 - Iniciar o servidor da API

1. Acesse a pasta da API:
   ```bash
   cd api-express/
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```
   Isso irá sincronizar o banco de dados automaticamente. **Deixe este terminal aberto.**

### Terminal 2 - Iniciar o frontend

1. Acesse a pasta do frontend:
   ```bash
   cd vagas-front/
   ```

2. Inicie o aplicativo:
   ```bash
   npx expo start
   ```

Agora o aplicativo estará pronto para ser testado.

> **Observação**: Testamos o aplicativo em dispositivos Android. No entanto, ao testar em dispositivos iOS, tome cuidado, pois a URL pode mudar dependendo do dispositivo.


## Funcionalidades do Projeto

* **30pts**: Conexão com a API de vagas, baseada no conteúdo apresentado pelo professor Jeferson.
* **10pts**: Permitir acesso ao app somente após o login.
* **10pts**: Implementar um contexto para o usuário autenticado.
* **10pts**: Persistir localmente os dados do usuário autenticado.
* **10pts**: Exibir um botão de contato apenas quando a vaga estiver aberta. Este botão redireciona o usuário diretamente para o WhatsApp.

## Credenciais de Teste
Para facilitar os testes do projeto, existe um usuário pré-configurado no sistema:

* E-mail: joao.silva@example.com
* Senha: 123

Você pode usar essas credenciais para realizar login e explorar as funcionalidades do aplicativo durante o desenvolvimento e teste.
