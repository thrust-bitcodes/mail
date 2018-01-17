Mail
===============

Mail é um *bitcode* para [Thrust](https://gitlab.com/thrustjs/thrust-seed) para envio de e-mails.

## API

```javascript
/**
  * Envia um email para um destinatário, com assunto e conteúdo
  * @param {String} recipientMail - e-mail do destinatário
  * @param {String} subject - Assunto do e-mail
  * @param {String} content - Conteúdo do e-mail
  * @param {String} [senderMail] - e-mail do remetente
  * @param {String} [senderPassword] - senha do remente
  * @example
   * sendMail("johnsmith@gmail.com", "Thust Mail Sender Test", "Hey John, how're u?")
*/
function sendMail(recipientMail, subject, content, senderMail, senderPassword)
```

## Parâmetros de configuração
As propriedades abaixo devem ser configuradas no arquivo *config.json* (distribuído juntamente com o Thrust):

``` javascript
{
  ...
  "mail": {
    "smtpHost": /*String*/,
    "smtpSocketFactoryPort":  /*Number*/,
    "smtpAuth": /*Boolean*/,
    "smtpPort": /*Number (Na maioria dos casos, o mesmo de smtpSocketFactoryPort)*/,
    "senderAddress": /*String (optional)*/,
    "senderPassword": /*String (optional)*/
  }
}
```


Authentication
===============

Authentication é um *bitcode* de autenticação/autorização para [ThrustJS](https://github.com/thrustjs/thrust) que utiliza JWT *(JSON Web Token)* como mecanismo principal.

# Instalação

Posicionado em um app [ThrustJS](https://github.com/thrustjs/thrust), no seu terminal:

```bash
thrust install authentication
```

## Tutorial

```javascript
let server = require('http')
let router = require('router')
let auth   = require('authentication')

router.addMiddleware(auth.validateAccess)

server.createServer(8778, router)
```

```javascript
//Rota de auth
let auth   = require('authentication')

function login (params, request, response) {
  auth.createAuthentication(params, request, response, 1, 'idDoApp', { role: 'admin'})
}

function logout (params, request, response) {
  auth.destroyAuthentication(params, request, response)
}

exports = {
  login: login,
  logout: logout
}
```

## API

```javascript
/**
* Cria um token de autenticação e o adiciona em um cookie, no header da resposta
* @param {Object} params - Parâmetros da requisição
* @param {Object} request - Request da requisição
* @param {Object} response - Response da requisição
* @param {Object} userId - Id do usuário
* @param {Object} appId - Id da aplicação (nota: uma aplicação pode conter vários ids)
* @param {Object} data - Dados que serão incluídos no token e disponibilizados em 'request.userData'
* @example
* @file login-endpoint.js
* @code authentication.createAuthentication(params, request, response, 341, 'mobileApp1', {profile: 'admin'})
*/
createAuthentication(params, request, response, userId, appId, data)

/**
* Destrói um autenticação caso ele exista
* @param {Object} params - Parâmetros da requisição
* @param {Object} request - Request da requisição
* @param {Object} response - Response da requisição
* @example
* @file logout-endpoint.js
* @code authentication.destroyAuthentication(params, request, response)
*/
destroyAuthentication(params, request, response)

/**
* Middleware que deve ser usado para ativar o módulo de autenticação
* @example
* @file startup.js
* @code router.addMiddleware(auth.validateAccess) //Nota: É recomendável que seja o primeiro middleware da aplicação
*/
validateAccess(params, request, response)

/**
* Seta uma função a ser chamada para definir se um token expirado pode ser revalidado.
* @example
* @file startup.js
* @code
* authentication.setCanRefreshTokenFn(function(token) {
*   return true
* })
*/
function setCanRefreshTokenFn(newFn)
```

## Parâmetros de configuração
As propriedades abaixo devem ser configuradas no arquivo *config.json* (distribuído juntamente com o ThrustJS):

``` javascript
"appName": /*String*/,
"authentication": { /*Configuração do authentication*/
  "notAuthenticatedUrls": /*String or StringArray*/,
  "useSecureAuthentication": /*Boolean (Sould to be True in production)*/,
  "accessTokenTTL": /*Number or Object with appID*/,
  "refreshTokenTTL": /*Number or Object with appID*/,
},
"jwt": { /*Configuração do jwt*/
  "jwsKey": /*String*/
}
```

Exemplo:

```javascript
/**
@file config.json
*/
{
    "appName": "MyApp",
    "authentication": {
      "notAuthenticatedUrls": [
        "/@auth/login",
        "/@auth/activate",
      ],
      "useSecureAuthentication": true,
      "accessTokenTTL": 300000 // 10 minutos, padrão para todos apps
      "refreshTokenTTL": {
          "central": 28800000 // 8 horas, para o app "central" apenas
      }
    }
    "jwt": {
      "jwsKey": "abcdefgh12345678",
    }
}
```
Acesse também os outros *bitcodes* utilizados no exemplo para melhor entendimento:

- [thrust-bitcodes/http](https://github.com/thrust-bitcodes/http)
- [thrust-bitcodes/authentication](https://github.com/thrust-bitcodes/authentication)
- [thrust-bitcodes/router](https://github.com/thrust-bitcodes/router)

