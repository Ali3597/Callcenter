const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');


app.use(session({
  secret: 'je suis un secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  store: MongoStore.create({
    mongoUrl:'mongodb://127.0.0.1:27017/CallCenter',
    ttl: 60 * 60 * 24 * 14,
  }),
}));