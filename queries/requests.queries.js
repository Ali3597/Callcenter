const Request = require("../database/models/request.model")




exports.findLimitedRequests=(limit,skip)=>{
    return   Request.find({}).limit(limit).skip(skip).populate("customer").exec();
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


getAlertRequests

exports.getAlertRequests= ()=> {
  return  Request.find({customer:customerId}).count().exec();
}
