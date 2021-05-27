const express = require('express');
const path = require('path');
require ("./database");
const app = express();
exports.app = app;
const morgan = require('morgan')
const index =require('./routes');
// variable des ports 
const port = process.env.PORT || 3000;

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');
require('./config/session.config');
require('./config/passport.config');
//middleware
app.use(morgan('short'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true  }));


//route
app.use(index);

//gestion des erreurs 



app.listen(port);