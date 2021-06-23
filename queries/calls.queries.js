const Call = require ("../database/models/call.model")



exports.findLimitedCallsByWorkerId=(limit,skip,workerId)=>{
    return   Call.find({destination:workerId}).populate("customer").limit(limit).skip(skip).exec();
  }

//   .sort({"created_at": 1})
  
exports.countCallsByWorkerId= (workerId)=> {

    return  Call.find({destination:workerId}).count().exec();
  }


exports.createCall= (array)=> {
  console.log("le log du calll ")
  console.log(array)
    const newCustomer = new Call({
      customer:array[0],
      number:array[1],
      destination:array[2]
    });
    return   newCustomer.save();
  }

exports.updateCallToAnsweredANdTimeById=async (callId,timeCall)=> {
    console.log("on a update le callllll")
    return   Call.findByIdAndUpdate(callId,{$set:{
        state : "answered",
        time: timeCall
    }},{runValidators: true  } ).exec();
    
  }


 