const Report = require("../database/models/report.model")

exports.findLimitedReports=(limit,skip)=>{
    return   Report.find({}).limit(limit).skip(skip).populate("author").populate("customer").exec();
  
  }
  
  exports.countReports= ()=> {
  
    return   Report.find({}).count().exec();
  }
  
  exports.findReportAndRelatedRequestsByIdAndAuthor= (reportId)=> {
    return   Report.findOne({_id:reportId}).populate({
      path : 'request',
      populate : {
        path : 'customer'
      }
    }).populate('author').exec();
  }

  exports.findLimitedReportsByRequestsId=(limit,skip,requestId)=>{
    return   Report.find({request:requestId}).limit(limit).skip(skip).exec();
}

  exports.countReportsByRequestId= (requestId)=> {
    return   Report.find({request:requestId}).count().exec();
  }
  

  exports.deleteReportById= (reportId)=> {
    return   Report.findByIdAndDelete(reportId).exec()
  }

