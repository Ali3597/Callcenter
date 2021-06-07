const Request = require("../database/models/request.model")




exports.findLimitedRequests=(limit,skip)=>{
    return   Request.find({}).limit(limit).skip(skip).populate("customer").exec();
}

exports.findRequestByIdWithCustomersAssociate= (requestId)=> {
  return   Request.findOne({_id:requestId}).populate('customer').exec();
}
exports.findRequestById= (requestId)=> {
  return   Request.findOne({_id:requestId}).exec();
}

  exports.countRequests= ()=> {
    return   Request.find({}).count().exec();
  }

  exports.findLimitedRequestsByCustomerId=(limit,skip,customerId)=>{
    return   Request.find({customer:customerId}).limit(limit).skip(skip).exec();
}


exports.findLimitedRequestsByCustomerIdWithCustomersAssociate=(limit,skip,customerId)=>{
  return   Request.find({customer:customerId}).limit(limit).skip(skip).populate('customer').exec();
}

exports.countRequestsByCustomerId= (customerId)=> {
  return   Request.find({customer:customerId}).count().exec();
}


exports.getDoneRequest= (requestId)=> {
    return   Request.findByIdAndUpdate(requestId,{$set:{done : true}},{runValidators: true  } );
}


exports.getUndoneRequest= (requestId)=> {
  return   Request.findByIdAndUpdate(requestId,{$set:{done : false}},{runValidators: true  } );
}


exports.getLimitedAlertRequestsWhithCustomers= (limit,skip)=> {
  
  return  Request.find({
    $and : [
    { $where: function() {
      return (Date.parse(this.deadline)- Date.now()< 1000 * 60 * 60 * 24 )
    }} ,
    {done:false},
  ]
  }).limit(limit).skip(skip).populate("customer").exec();
}








exports.countAlertedRequest= ()=> {
  return  Request.find(
    { $where: function() {
      return (this.deadline-Date.now()< 1000 * 60 * 60 * 24 )
    } }).count().exec();
}



exports.DeleteRequestById= (requestId)=> {
  return   Request.findByIdAndDelete(requestId).exec()
}

exports.createRequest= (array,currentUserId)=> {

  const newRequest = new Request({
    author:currentUserId,
    customer:array[0],
    message:array[1],
    typeof:array[2],
    urgencyLevel:array[3],
    deadline:  Date.parse(array[4])
  });
  return   newRequest.save();
}







