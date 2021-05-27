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
    mongoUrl:'mongodb+srv://Ali:pwd@cluster0.l6s0n.mongodb.net/callCenter?retryWrites=true&w=majority',
    ttl: 60 * 60 * 24 * 14,
  }),
}));