const Report = require("../database/models/report.model")

exports.findLimitedReports=(limit,skip)=>{
    return   Report.find({}).limit(limit).skip(skip).populate({
      path: 'request',
      populate: { path: 'customer' }
    }).exec();
  
  }
  
  exports.countReports= ()=> {
  
    return   Report.find({}).count().exec();
  }
  
