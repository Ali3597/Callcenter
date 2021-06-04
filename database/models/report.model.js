const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reportSchema = schema({
  message:{type:String,required:true},
  date : { type : Date, default: Date.now },
  author:{type: schema.Types.ObjectId, ref: 'worker', required :true},
  request:[{type: schema.Types.ObjectId, ref: 'request', required :true}],
});





reportSchema.post('updateMany', async    function(next) {
  console.log(this._conditions.customer)
  console.log("hellooooooo")
  next()
  })
 

const Report = mongoose.model('report', reportSchema);





module.exports = Report;