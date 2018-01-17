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
