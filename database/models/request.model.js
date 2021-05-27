const mongoose = require('mongoose');
const schema = mongoose.Schema;

const requestSchema = schema({
  message: {type:String, required:true},
  urgencyLevel: {type: String,unique:true,required:true},
  typeof:{ type: String  ,unique:true},
  deadline:{type: Date},
  date : { type : Date, default: Date.now },
  author:{type: schema.Types.ObjectId, ref: 'worker', required :true},
  customer:{type: schema.Types.ObjectId, ref: 'customer', required :true},
  workerDone:{type: schema.Types.ObjectId, ref: 'worker', required :true},
  rebound:{type: schema.Types.ObjectId, ref: 'rebound'},
  report:{type: schema.Types.ObjectId, ref: 'report'},
});

const Request = mongoose.model('request', requestSchema);

module.exports = Request