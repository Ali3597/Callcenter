const mongoose = require('mongoose');

exports.clientPromise = mongoose.connect('mongodb+srv://Ali:pwd@cluster0.l6s0n.mongodb.net/callCenter?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => console.log('connexion db ok !')).catch( err => console.log(err));

