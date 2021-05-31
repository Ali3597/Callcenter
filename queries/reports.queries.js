const Report = require("../database/models/report.model")

exports.findLimitedReports=(limit,skip)=>{
    return   Report.find({}).limit(limit).skip(skip).populate("author").populate("customer").exec();
  
  }
  
  exports.countReports= ()=> {
  
    return   Report.find({}).count().exec();
  }
  


  exports.findLimitedReportsByCustomerId=(limit,skip,customerId)=>{
   
    return   Report.find({customer:customerId}).limit(limit).skip(skip).populate("author").populate("customer").exec();
  }


  exports.countReportsByCustomerId= (customerId)=> {
    return   Report.find({customer:customerId}).count().exec();
  }
  
