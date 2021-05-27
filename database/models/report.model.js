const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reportSchema = schema({
  message:{type:String,required:true},
  date : { type : Date, default: Date.now },
  author:{type: schema.Types.ObjectId, ref: 'worker', required :true},
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;