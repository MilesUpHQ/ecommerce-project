const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
var adminRouter = require('./routes/admin/category');
const db = require("./config/dbConfig");
const port = process.env.PORT;
const resetPassword = require("./routes/resetPassword");
const forgotPassword = require("./routes/forgotPassword");
dotenv.config();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bookshelf = require('bookshelf')(db);
const securePassword = require('bookshelf-secure-password');
bookshelf.plugin(securePassword);
const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/reset_password", resetPassword);
app.use("/api/forgot_password", forgotPassword);
const User = bookshelf.Model.extend({
  tableName: 'users',
  hasSecurePassword: true
});

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const strategy = new JWTStrategy(opts, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  User.forge({ id: jwt_payload.id }).fetch().then(res => {
      next(null, res);
  })
});

app.use(bodyParser.json());
passport.use(strategy);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ name: "Magesh", company: "Sedin pvt" });
});

app.listen(port, () =>
  console.log(`JS Bootcamp project listening on port ${port}!`)
);

app.use('/', adminRouter)

app.post('/signup',(req,res)=>{
  console.log(req);
  console.log(req.body);

  if (!req.body.username || !req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name) {
      res.status(400).send('Please provide the details');
  }
  const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
  });
  console.log(user);
  user.save().then(() => {
      res.send('User created successfully');
  });
})


app.post('/getToken', (req, res) => {
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  if(!req.body.email || !req.body.password){
      res.status(401).send('Please provide email and password');
  }
  User.forge({ email: req.body.email }).fetch().then(user => {
      user.authenticate(req.body.password).then(() => {
          const payload = { id: user.id };
          const token = jwt.sign(payload, process.env.JWT_SECRET);
          res.json({ token });
      }).catch(err => {
          res.status(401).send('Invalid email or password');
      });
  });

});

app.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

// /admin/products
//   / admin/products/new
// POST / admin / products
//   / admin / categories
// /admin/categories/new
//   / admin / orders
