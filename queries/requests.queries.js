const Request = require("../database/models/request.model")




exports.findLimitedRequests=(limit,skip)=>{
    return   Request.find({}).limit(limit).skip(skip).populate("customer").exec();
}

exports.findRequestByIdWithCustomersAssociate= (requestId)=> {
  return   Request.findOne({_id:requestId}).populate('customer').exec();
}



  exports.countRequests= ()=> {
    return   Request.find({}).count().exec();
  }

  exports.findLimitedRequestsByCustomerId=(limit,skip,customerId)=>{
    return   Request.find({customer:customerId}).limit(limit).skip(skip).exec();
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
  return  Request.find(
    { $where: function() {
      return (this.deadline-Date.now()< 1000 * 60 * 60 * 24 )
    } }).limit(limit).skip(skip).populate("customer").exec();
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