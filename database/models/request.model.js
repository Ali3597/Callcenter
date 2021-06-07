const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Report = require("./report.model")

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
  rebound:[{type: schema.Types.ObjectId, ref: 'rebound'}],
});


// requestSchema.post('deleteMany', async    function(next) {
//   console.log(this._conditions.customer)
// requests =  await  Request.find({customer: this._conditions.customer})
// requests.forEach(request=> {
//   Report.updateMany({},{$pull: {request:request._id}},{multi:true}).exec()

//   })
//   next()
// });
  


// requestSchema.post('findOneAndDelete', async    function(next) {
//   console.log(this._conditions.customer)
// requests =  await  Request.find({customer: this._conditions.customer})
// requests.forEach(request=> {
//   Report.updateMany({},{$pull: {request:request._id}},{multi:true}).exec()

//   })
//   next()
// });
 


const Request = mongoose.model('request', requestSchema);

module.exports = Request