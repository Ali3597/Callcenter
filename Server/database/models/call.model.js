const mongoose = require('mongoose');
const schema = mongoose.Schema;


const callSchema = schema({
  customer:{type: schema.Types.ObjectId, ref: 'customer'},
  number: {type: String,required:true},
  date : { type : Date, default: Date.now },
  time:{ type: String, default:"00:00" },
  state:{ type: String, default:"missCall"  },
  destination:{type: schema.Types.ObjectId, ref: 'worker', required :true},
});




const Call = mongoose.model('call', callSchema);

module.exports = Call;