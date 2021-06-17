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
  number: {type: String,required:true ,unique:true},
  type: {type: String,required:true },
  state : { type: String, default: "unavailable" },
  lastHangUp: {type: Date, default : Date.now()}
});





workerSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch(e) {
    throw e
  }
}

workerSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.local.password);
}


const Worker = mongoose.model('worker', workerSchema);

module.exports = Worker;