const mongoose = require('mongoose');
const schema = mongoose.Schema;

const requestSchema = schema({
  message: {type:String, required:true},
  urgencyLevel: {type: String,unique:true,required:true},
  date : { type : Date, default: Date.now },
  deadline:{type: Date},
  author:{type: schema.Types.ObjectId, ref: 'worker', required :true},
});

const Rebound = mongoose.model('rebound', reboundSchema);

module.exports = Rebound;