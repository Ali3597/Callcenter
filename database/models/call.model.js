const mongoose = require('mongoose');
const schema = mongoose.Schema;


const callSchema = schema({
  name: {type:String, default:"unknow"},
  number: {type: String,unique:true,required:true},
  date : { type : Date, default: Date.now },
  time:{ type: String, default:"00:00" },
  state:{ type: String, required:true  },
  destination:{type: schema.Types.ObjectId, ref: 'worker', required :true},
});




const Call = mongoose.model('call', callSchema);

module.exports = Call;