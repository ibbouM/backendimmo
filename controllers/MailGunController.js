require("dotenv").config();

var mailgun = require("mailgun-js")({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
});

var from;
var to;
var subject;
var text;

const MailGunController = {
  CreateMail: async (req, res) => {
    (from = req.body.from),
      (to = process.env.MAIL_TO),
      (subject = req.body.subject),
      (text = req.body.text),
      console.log(from);
    console.log(subject);
    console.log(text);
    try {
      const data = {
        from: from,
        to: to,
        subject: subject,
        text: text,
      };

    
      console.log(data);

      mailgun.messages().send(data, (body) => {
        console.log(body);
        res.status(200).send("Votre message a été envoyé.");
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = MailGunController;
