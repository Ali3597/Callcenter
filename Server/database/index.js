const mongoose = require('mongoose');

exports.clientPromise = mongoose.connect('mongodb://127.0.0.1:27017/CallCenter', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => console.log('connexion db ok !')).catch( err => console.log(err));

