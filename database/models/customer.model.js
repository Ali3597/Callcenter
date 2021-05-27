const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customerSchema = schema({
  name: {type:String, default:"unknow"},
  number: {type: String,unique:true,required:true},
  email:{ type: String  ,unique:true},
  avatar: {type : String, default:'/images/téléchargement.jfif'}, 
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;