const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailer = require('nodemailer')
const _ = require('lodash');
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.post('/email', (req, res) => {
  const { name, email, message } = req.body;

  let transport = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.pass
    }
  });

  let mailOptions = {
    from: email,
    to: 'holybubbles00@gmail.com',
    subject: `Message from kennycm.com`,
    text: `${name} - ${email} \n ${_.escape(message)}`
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send({
        error: error
      });
    } else {
      console.log('Email sent: ' + info.response);
      res.send({
        error: false
      });
    }
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
})