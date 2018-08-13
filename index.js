
/*
 * @Author: Cleverson Puche
 * @Date: 2017-13-12 18:59:57
 */

var Properties = Java.type("java.util.Properties")
var Message = Java.type("javax.mail.Message")
var PasswordAuthentication = Java.type("javax.mail.PasswordAuthentication")
var Session = Java.type("javax.mail.Session")
var Transport = Java.type("javax.mail.Transport")
var InternetAddress = Java.type("javax.mail.internet.InternetAddress")
var MimeMessage = Java.type("javax.mail.internet.MimeMessage")
var Authenticator = Java.type("javax.mail.Authenticator")
var MimeBodyPart = Java.type("javax.mail.internet.MimeBodyPart")
var MimeMultipart = Java.type("javax.mail.internet.MimeMultipart")
var DataHandler = Java.type("javax.activation.DataHandler")
var DataSource = Java.type("javax.activation.DataSource")
var ByteArrayDataSource = Java.type("javax.mail.util.ByteArrayDataSource")

/**
* @description
* Bitcode de envio de email
*/

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
function sendMail(recipientMail, subject, content, senderMail, senderPassword, attachments) {
  var properties = new Properties()
  var mailConfig = getBitcodeConfig('mail')()

  properties.put("mail.smtp.host", mailConfig.smtpHost || "smtp.gmail.com")
  properties.put("mail.smtp.socketFactory.port", mailConfig.smtpSocketFactoryPort ? mailConfig.smtpSocketFactoryPort.toString() : "465")
  properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory")
  properties.put("mail.smtp.auth", mailConfig.smtpAuth ? mailConfig.smtpAuth.toString() : "true")
  properties.put("mail.smtp.port", mailConfig.smtpPort ? mailConfig.smtpPort.toString() : "465")

  var session = Session.getDefaultInstance(properties,
    new Authenticator() {
      getPasswordAuthentication: function () {
        return new PasswordAuthentication(senderMail || mailConfig.senderAddress, senderPassword || mailConfig.senderPassword)
      }
    }
  )

  var htmlBodyPart = new MimeBodyPart()
  htmlBodyPart.setContent(content, "text/html; charset=utf-8")

  var mimeMultipart = new MimeMultipart()
  mimeMultipart.addBodyPart(htmlBodyPart)

  if (attachments && attachments.constructor.name.toLowerCase() === 'array') {
    attachments.forEach(function (item) {
      var dataSource = new ByteArrayDataSource(item.bytes, item.contentType)
      var mimeBodyPart = new MimeBodyPart()
      mimeBodyPart.setDataHandler(new DataHandler(dataSource))
      mimeBodyPart.setFileName(item.fileName)

      mimeMultipart.addBodyPart(mimeBodyPart)
    })
  }

  var message = new MimeMessage(session)
  message.setFrom(new InternetAddress(senderMail || mailConfig.senderAddress))
  message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientMail))
  message.setSubject(subject, "UTF-8")
  message.setContent(mimeMultipart)

  Transport.send(message)
}

exports = {
  sendMail: sendMail
}
