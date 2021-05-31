const Request = require("../database/models/request.model")




exports.findLimitedRequests=(limit,skip)=>{
    return   Request.find({}).limit(limit).skip(skip).populate("customer").exec();
}

  exports.countRequests= ()=> {

    return   Request.find({}).count().exec();
  }