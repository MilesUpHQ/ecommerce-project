const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 4000;
dotenv.config();

const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const knex = require("knex")(config);
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ name: "Magesh", company: "Sedin pvt" });
});

app.listen(port, () =>
  console.log(`JS Bootcamp project listening on port ${port}!`)
);

app.post('/forgot_password', (req, res) => {
  if (req.body.email == '') {
    res.status(400).send('email required')
  }
  knex('users').where('email', req.body.email).then((result) => {
    if (result.length == 0) {
      res.status(404).send('E-mail does not exists');
    } else {
      const token = jwt.sign({ email: req.body.email }, 'jwtSecret', {
        expiresIn: '1hr'
      })
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nadigergangotri@gmail.com',
          pass: 'gangotri@sg3'
        }
      })
      const mailOptions = {
        from: 'nadigergangotri@gmail.com',
        to: req.body.email,
        subject: 'LINK TO RESET PASSWORD',
        text: 'Please click on the following link to reset ur password : \n\n' +
          `http://localhost:3000/reset_password/${token}\n\n` +
          'If you did not requested,Please ignore this one ,JOLLY\n'
      }
      transporter.sendMail(mailOptions, function (err, response) {
        if (err) {
          res.status(505).json(err)
        } else {
          res.status(200).json('recovery email sent')
        }
      })
    }
  })
});

app.put('/reset_password', async (req, res, next) => {
  knex('users').where('email', req.body.email).then(async (result) => {
    if (result.length == 0) {
      res.status(404).send('E-mail does not exists');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      knex('users')
        .returning('id', 'username', 'email')
        .where('email', req.body.email)
        .update({ password_digest: hashedPassword }).then((row) => {
          res.status(200).json(row[0])
        }).catch(err => {
          res.status(505).json(err)

        })
    }
  })

})


// /admin/products
//   / admin/products/new
// POST / admin / products
//   / admin / categories
// /admin/categories/new
//   / admin / orders
