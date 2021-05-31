const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reportSchema = schema({
  message:{type:String,required:true},
  date : { type : Date, default: Date.now },
  author:{type: schema.Types.ObjectId, ref: 'worker', required :true},
  customer:{type: schema.Types.ObjectId, ref: 'customer', required :true},
  request:{type: schema.Types.ObjectId, ref: 'request', required :true},
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;