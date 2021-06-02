const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Request = require("./request.model")

const customerSchema = schema({
  name: {type:String, default:"unknow"},
  number: {type: String,unique:true,required:true},
  email:{ type: String  ,unique:true},
  avatar: {type : String, default:'/images/téléchargement.jfif'}, 
});

customerSchema.pre('findByIdAndDelete', async function(next) {
try {
  await Request.deleteMany({
    customer :  this._id
  })
   console.log("goooooooooooood");
   next()
 }
 catch (err) {
  next(err)
}
})



const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;