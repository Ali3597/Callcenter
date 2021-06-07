const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Request = require("./request.model")

const customerSchema = schema({
  name: {type:String, default:"unknow"},
  number: {type: String,unique:true,required:true},
  email:{ type: String  ,unique:true,default:"unknow"},
  avatar: {type : String, default:'/images/téléchargement.jfif'}, 
});

// customerSchema.pre('findOneAndDelete', function(next) {
// console.log(this._conditions)

// Request.deleteMany({customer : this._conditions._id}).exec()
// next()

// })



const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;