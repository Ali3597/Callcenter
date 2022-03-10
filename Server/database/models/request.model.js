const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Report = require("./report.model")

const requestSchema = schema({
  message: {type:String, required:true},
  urgencyLevel: {type: String,required:true},
  typeof:{ type: String ,required:true },
  deadline:{type: Date,required:true},
  date : { type : Date, default: Date.now },
  done : { type: Boolean, default: false },
  author:{type: schema.Types.ObjectId, ref: 'worker', required :true},
  customer:{type: schema.Types.ObjectId, ref: 'customer', required :true},
  workerDone:{type: schema.Types.ObjectId, ref: 'worker'},
});



 


const Request = mongoose.model('request', requestSchema);

module.exports = Request