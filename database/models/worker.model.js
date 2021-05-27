const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')
mongoose.set('useUnifiedTopology', true);


const workerSchema = schema({
  username: { type: String , required: true, unique:true },
  local :{
      email:{ type: String , required: true ,unique:true},
      password:{ type: String , required: true },
  },
  avatar: {type : String, default:'/images/téléchargement.jfif'}, 
});




workerSchema.statics.hashPassword = function(password){
  return bcrypt.hash(password,12)
}



workerSchema.methods.comparePassword=function(password){
  return bcrypt.compare(password,this.local.password)
 }

const Worker = mongoose.model('worker', workerSchema);

module.exports = Worker;