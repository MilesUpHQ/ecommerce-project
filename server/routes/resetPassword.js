const express = require('express');
const router = express.Router()
const knex = require('../utils/knex');
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs');

console.log("in reset router");
router.put('/', async (req, res, next) => {
    knex('users').where('email', req.body.email).then(async (result) => {
      if (result.length == 0) {
        res.status(404).send('E-mail does not exists');
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        knex('users')
          .returning('id', 'username', 'email')
          .where('email', req.body.email)
          .update({ password_digest: hashedPassword }).then((row) => {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.GMAIL_AUTH_USER,
                pass: process.env.GMAIL_AUTH_PASSWORD
              }
            })
            const mailOptions = {
              from: process.env.GMAIL_AUTH_USER,
              to: req.body.email,
              subject: 'Reset password successfull',
              text: 'Your request for reset for password is  sucessfull  \n\n' +
                'Please login into your account now!@@' +
                'If it is not you ,Please check it out\n'
            }
            transporter.sendMail(mailOptions, function (err, response) {
              if (err) {
                res.status(505).json(err)
              } else {
                res.status(200).json('email sent')
              }
            })
            res.status(200).json(row[0])
          }).catch(err => {
            res.status(505).json(err)
  
          })
      }
    })
  
  })


module.exports = router;