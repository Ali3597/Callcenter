const mongoose = require('mongoose');
const schema = mongoose.Schema;

const requestSchema = schema({
  message: {type:String, required:true},
  urgencyLevel: {type: String,required:true},
  typeof:{ type: String  },
  deadline:{type: Date},
  date : { type : Date, default: Date.now },
  done : { type: Boolean, default: false },
  author:{type: schema.Types.ObjectId, ref: 'worker', required :true},
  customer:{type: schema.Types.ObjectId, ref: 'customer', required :true},
  workerDone:{type: schema.Types.ObjectId, ref: 'worker'},
  rebound:{type: schema.Types.ObjectId, ref: 'rebound'},
});

const Request = mongoose.model('request', requestSchema);

module.exports = Request