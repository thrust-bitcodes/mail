Mail
===============

Mail é um *bitcode* de envio de e-mails para [Thrust](https://gitlab.com/thrustjs/thrust-seed).

# Instalação

Posicionado em um app [ThrustJS](https://github.com/thrustjs/thrust), no seu terminal:

```bash
thrust install mail
```

## Tutorial
```javascript
let mail = require('mail')

mail.sendMail("johnsmith@gmail.com", "Assunto", "Conteúdo")
```

## API

```javascript
/**
  * Envia um email para um destinatário, com assunto e conteúdo
  * @param {String} recipientMail - e-mail do destinatário
  * @param {String} subject - Assunto do e-mail
  * @param {String} content - Conteúdo do e-mail
  * @param {String} senderMail - e-mail do remetente
  * @param {String} senderPassword - senha do remente
  * @param {Array[Object]} attachments - anexos a serem enviados
  * @example
   * sendMail("johnsmith@gmail.com", "Thust Mail Sender Test", "Hey John, how're u?", [{bytes: byte[], contentType: 'application/pdf', fileName: 'relatorio.pdf'}])
*/
function sendMail(recipientMail, subject, content, senderMail, senderPassword, attachments)
```

## Parâmetros de configuração
As propriedades abaixo devem ser configuradas no arquivo *config.json* (distribuído juntamente com o Thrust):

``` javascript
{
  ...
  "mail": {
    /* Os valores abaixo representam os defaults da configuração. */
    "smtpHost": "smtp.gmail.com",
    "smtpSocketFactoryPort":  465,
    "smtpAuth": true,
    "smtpPort": 465,
    "senderAddress": /*String (usado caso não seja passado na chamada do sendMail)*/,
    "senderPassword": /*String (usado caso não seja passado na chamada do sendMail)*/
  }
}
```
