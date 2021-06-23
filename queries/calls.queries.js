const Call = require ("../database/models/call.model")



exports.findLimitedCallsByWorkerId=(limit,skip,workerId)=>{
    return   Call.find({destination:workerId}).limit(limit).skip(skip).exec();
  }

  
exports.countCallsByWorkerId= (workerId)=> {

    return  Call.find({destination:workerId}).count().exec();
  }


// exports.createCustomer= (array)=> {

//     const newCustomer = new Customer({
//       name:array[0],
//       number:array[1],
//       email:array[2]
//     });
//     return   newCustomer.save();
//   }